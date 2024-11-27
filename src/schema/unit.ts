import { z } from 'zod';

export const createUnitSchema = z.object({
  unitName: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
  qty: z.number().min(1, 'Qty must be greater than 0'),
});

export const updateUnitSchema = createUnitSchema;

export type CreateFormData = z.infer<typeof createUnitSchema>;
export type UpdateFormData = z.infer<typeof updateUnitSchema>;
