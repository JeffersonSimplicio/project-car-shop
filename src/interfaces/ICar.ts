import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().gte(2).lte(4).int(),
  seatsQty: z.number().gte(2).lte(7).int(),
});

type ICar = z.infer<typeof carZodSchema>;

export { ICar, carZodSchema };