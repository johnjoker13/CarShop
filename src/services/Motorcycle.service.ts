import { 
  Motorcycle, 
  MotorcycleInterface,
} from '../interfaces/MotorcycleInterface';
import MongoService, { ServiceError } from './MongoService';
import MotorcycleModel from '../models/Motorcycle.model';

export const motorCycleModel = new MotorcycleModel();

class MotorcycleService extends MongoService<Motorcycle> {
  constructor(model = motorCycleModel) {
    super(model);
  }

  create = async (obj: Motorcycle): 
  Promise<Motorcycle | null | ServiceError> => {
    const parsed = MotorcycleInterface.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  read = async (): Promise<Motorcycle[]> => this.model.read();
}

export default MotorcycleService;
