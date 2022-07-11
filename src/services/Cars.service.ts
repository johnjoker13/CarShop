import { Car, CarInterface } from '../interfaces/CarInterface';
import MongoService, { ServiceError } from './MongoService';
import CarsModel from '../models/Cars.model';

class CarService extends MongoService<Car> {
  constructor(model = new CarsModel()) { 
    super(model);
  }

  create = async (obj: Car): Promise<Car | null | ServiceError> => {
    const parsed = CarInterface.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };
}

export default CarService;
