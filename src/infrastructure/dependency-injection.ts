import { DrawingDbRepository } from "../infrastructure/drawing.db-repository";
import { DrawingRepository } from "../domain/drawing.repository";

import { CreateDrawingUseCase } from "../application/create-drawing.use-case";

const drawingRepository: DrawingRepository = new DrawingDbRepository();

export const createDrawingUseCase = new CreateDrawingUseCase(drawingRepository);