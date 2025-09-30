import { JsonValue } from "@/shared/types/json.types";
import { Drawing } from "./drawing.entity";

export type DrawingListRow = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateDrawingDataDTO = {
  id: string;
  storeData: JsonValue | null;
  updatedAt: Date;
};

export interface DrawingRepository {
  create(drawing: Drawing): Promise<string>;
  findById(id: string): Promise<Drawing | null>;
  findAll(): Promise<DrawingListRow[]>;
  updateData(drawing: UpdateDrawingDataDTO): Promise<void>;
}