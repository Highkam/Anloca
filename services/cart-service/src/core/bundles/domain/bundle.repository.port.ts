import { Bundle } from './bundle.entity';

export interface BundleRepositoryPort {
  create(payload: { userId: number; name: string; recurrenceId: number }): Promise<Bundle>;
  update(id: number, payload: { name?: string; recurrenceId?: number }): Promise<Bundle | null>;
  findById(id: number): Promise<Bundle | null>;
  findAll(): Promise<Bundle[]>;
  delete(id: number): Promise<void>;
}
