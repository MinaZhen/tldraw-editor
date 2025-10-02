import { Drawing } from "@/domain/drawing.entity";
import { DrawingRepository } from "@/domain/drawing.repository";

export class CreateDrawingUseCase {
  private repository: DrawingRepository;

  constructor(repository: DrawingRepository) {
    this.repository = repository;
  }

  public async execute({ name }: { name: string; } ): Promise<string> {
    const newDrawing = Drawing.create(name);
    return this.repository.create(newDrawing);
  }
}