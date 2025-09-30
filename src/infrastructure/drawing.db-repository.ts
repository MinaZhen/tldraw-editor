import { Drawing } from "../domain/drawing.entity";
import { DrawingRepository } from "../domain/drawing.repository";
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
}