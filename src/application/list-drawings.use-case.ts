import { DrawingRepository, DrawingListRow } from "../domain/drawing.repository";

export class ListDrawingsUseCase {
  private repository: DrawingRepository;

  constructor(repository: DrawingRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<DrawingListRow[]> {
    return this.repository.findAll();
  }
}