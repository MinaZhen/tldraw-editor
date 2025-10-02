import { JsonValue } from "@/shared/types/json.types";
import { DrawingRepository } from "@/domain/drawing.repository";

export class SaveStoreDataUseCase {
  private repository: DrawingRepository;

  constructor(repository: DrawingRepository) {
    this.repository = repository;
  }

  public async execute({ id, storeData }: { id: string; storeData: JsonValue } ): Promise<void> {
    const updatePayload = { id, storeData, updatedAt: new Date() };
    await this.repository.updateData(updatePayload);
  }
}