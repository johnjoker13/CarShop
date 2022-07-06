export interface Model<T> {
  create(obj: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(_id_: string): Promise<T | null>;
  update(_id_: string, obj: T): Promise<T | null>;
  delete(_id_: string): Promise<T | null>;
}
