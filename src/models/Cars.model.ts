import { model as createModel, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';
import CarDocument from '../interfaces/CardDocument';

export const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class CarsModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarsModel;
