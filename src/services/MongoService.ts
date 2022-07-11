import { ZodError } from 'zod';
import MongoModel from '../models/MongoModel';

export interface ServiceError {
  error: ZodError;
}

abstract class MongoService<T> {
  constructor(protected model: MongoModel<T>) { }

  public create = async (obj: T): Promise<T | null | ServiceError> => 
    this.model.create(obj);

  public read = async (): Promise<T[]> => this.model.read();

  public readOne = async (id: string): Promise<T | null | ServiceError> =>
    this.model.readOne(id);

  public update =
  async (id: string, obj: T): Promise<T | null | ServiceError> =>
    this.model.update(id, obj);
  
  public delete = async (id: string): Promise<T | null | ServiceError> =>
    this.model.delete(id);
}

export default MongoService;
