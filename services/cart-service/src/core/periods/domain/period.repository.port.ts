export interface PeriodRepositoryPort {
  create(data: { name: string; durationDays: number }): Promise<any>;
  update(id: number, data: { name?: string; durationDays?: number }): Promise<any>;
  findById(id: number): Promise<any | null>;
  findAll(): Promise<any[]>;
  delete(id: number): Promise<void>;
}
