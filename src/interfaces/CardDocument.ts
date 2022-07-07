import { Document } from 'mongoose';
import { Car } from './CarInterface';

interface CarDocument extends Car, Document { }

export default CarDocument;
