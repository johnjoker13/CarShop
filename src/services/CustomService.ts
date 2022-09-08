import { ZodError } from 'zod';
import CustomModel from '../models/CustomModel';

export interface ServiceError {
  error: ZodError;
}

abstract class CustomService<T> {
  constructor(protected model: CustomModel<T>) { }

  public create = async (obj: T): Promise<T | null | ServiceError> => 
    this.model.create(obj);

  public read = async (): Promise<T[]> => this.model.read();

  public readOne = async (id: string): Promise<T | null | ServiceError> =>
    this.model.readOne(id);

  public async update(id: string, obj: T): Promise<T |
  null> {
    return this.model.update(id, obj);
  }

  public delete = async (id: string): Promise<T | null> =>
    this.model.delete(id);
}

export default CustomService;
