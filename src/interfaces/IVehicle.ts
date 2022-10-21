import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022).int(),
  color: z.string().min(3),
  status: z.optional(z.boolean()),
  buyValue: z.number().int(),
});

type IVehicle = z.infer<typeof vehicleZodSchema>;

export { IVehicle, vehicleZodSchema };