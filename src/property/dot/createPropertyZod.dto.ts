import { z } from 'zod';

export const createPropertySchema = z
  .object({
    name: z.string(),
    description: z.string().min(5).max(50),
    price: z.string(),
  })
  .required();

export type CreatePropertyDtoZod = z.infer<typeof createPropertySchema>;
