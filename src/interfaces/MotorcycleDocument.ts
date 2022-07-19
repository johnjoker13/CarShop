import { Document } from 'mongoose';
import { Motorcycle } from './MotorcycleInterface';

interface MotorcycleDocument extends Motorcycle, Document { }

export default MotorcycleDocument;
