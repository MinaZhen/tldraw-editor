import { Drawing } from "./drawing.entity";

export interface DrawingRepository {
  create(drawing: Drawing): Promise<string>;
}