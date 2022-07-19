import { z } from 'zod';
import { VehicleInterface } from './VehicleInterface';

export const MotorcycleInterface = VehicleInterface.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

export type Motorcycle = z.infer<typeof MotorcycleInterface>;
