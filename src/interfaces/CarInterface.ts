import { z } from 'zod';
import { VehicleInterface } from './VehicleInterface';

const CarInterface = VehicleInterface.extend({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

type Car = z.infer<typeof CarInterface>;

export { CarInterface, Car };
