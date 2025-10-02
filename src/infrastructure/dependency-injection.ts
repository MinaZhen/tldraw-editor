import { DrawingDbRepository } from "../infrastructure/drawing.db-repository";
import { DrawingRepository } from "@/domain/drawing.repository";

import { CreateDrawingUseCase } from "../application/create-drawing.use-case";
import { ListDrawingsUseCase } from "../application/list-drawings.use-case";
import { SaveStoreDataUseCase } from "@/application/save-store-data.use-case";
import { FindDrawingByIdUseCase } from "@/application/find-by-id.use-case";

const drawingRepository: DrawingRepository = new DrawingDbRepository();

export const createDrawingUseCase = new CreateDrawingUseCase(drawingRepository);
export const listDrawingsUseCase = new ListDrawingsUseCase(drawingRepository);
export const saveStoreDataUseCase = new SaveStoreDataUseCase(drawingRepository);
export const findDrawingByIdUseCase = new FindDrawingByIdUseCase(drawingRepository);