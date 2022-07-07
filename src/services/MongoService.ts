import MongoModel from '../models/MongoModel';

abstract class MongoService<T> {
  constructor(protected model: MongoModel<T>) { }

  public create = async (obj: T): Promise<T | null> => this.model.create(obj);

  public read = async (): Promise<T[]> => this.model.read();
}

export default MongoService;
