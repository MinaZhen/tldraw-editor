import { Drawing } from "../domain/drawing.entity";
import { DrawingRepository } from "../domain/drawing.repository";

export class FindDrawingByIdUseCase {
  private repository: DrawingRepository;

  constructor(repository: DrawingRepository) {
    this.repository = repository;
  }

  public async execute({ id }: { id: string; }): Promise<Drawing | null> {
    return this.repository.findById(id);
  }
}