import { JsonValue } from "@/shared/types/json.types";
import { Drawing } from "../domain/drawing.entity";
import { 
  DrawingRepository, 
  DrawingListRow,
  UpdateDrawingDataDTO,
} from "../domain/drawing.repository";
import { prisma } from "./database/prisma/prisma.service";
import { PrismaClient, Prisma } from "@prisma/client";

type TldrawDataClient = PrismaClient["tldrawData"];

export class DrawingDbRepository implements DrawingRepository {
  private model: TldrawDataClient;

  constructor() {
    this.model = prisma.tldrawData;
  }

  public async create(drawing: Drawing): Promise<string> {
    const { name, storeData, createdAt, updatedAt } = drawing; 
    const newDrawing = await this.model.create({
      data: { name, storeData: storeData as Prisma.JsonObject, createdAt, updatedAt },
      select: { id: true },
    });

    return newDrawing.id;
  }

  public async findById(id: string): Promise<Drawing | null> {
    const data = await this.model.findUnique({ where: { id } });
    return data ? new Drawing({ ...data, storeData: data.storeData as JsonValue | null }) : null;
  }

  public async findAll(): Promise<DrawingListRow[]> {
    return this.model.findMany({
      select: { id: true, name: true, createdAt: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
  }
  
  public async updateData(props: UpdateDrawingDataDTO): Promise<void> {
    const { id, storeData, updatedAt } = props;

    await this.model.update({
      where: { id },
      data: { storeData: storeData as Prisma.JsonObject, updatedAt },
    });
  }
}