import { model as createModel, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import CustomModel from './CustomModel';
import CarDocument from '../interfaces/CardDocument';

export const carSchema = new Schema<CarDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: Boolean,
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
}, { versionKey: false });

export const carModel = createModel<CarDocument>('Car', carSchema);

class CarsModel extends CustomModel<Car> {
  constructor(model = carModel) {
    super(model);
  }
}

export default CarsModel;
