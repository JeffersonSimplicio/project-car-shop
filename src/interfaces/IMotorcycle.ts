import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const motorcycleZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().lte(2500).int().positive(),
});

type IMotorcycle = z.infer<typeof motorcycleZodSchema>;

export { IMotorcycle, motorcycleZodSchema };