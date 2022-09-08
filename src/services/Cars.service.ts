import { Car, CarInterface } from '../interfaces/CarInterface';
import CustomService, { ServiceError } from './CustomService';
import CarsModel from '../models/Cars.model';

class CarService extends CustomService<Car> {
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
