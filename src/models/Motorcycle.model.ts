import { model as createModel, Schema } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';
import CustomModel from './CustomModel';
import MotorcycleDocument from '../interfaces/MotorcycleDocument';

export const motorcycleSchema = new Schema<MotorcycleDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: Boolean,
  buyValue: { type: Number, required: true },
  category: { type: String, required: true },
  engineCapacity: { type: Number, required: true },
}, { versionKey: false });

export const motorcycleModel = createModel<MotorcycleDocument
>('Motorcycle', motorcycleSchema);

class MotorcycleModel extends CustomModel<Motorcycle> {
  constructor(model = motorcycleModel) {
    super(model);
  }
}

export default MotorcycleModel;
