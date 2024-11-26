import { z } from 'zod';

export const createBrandSchema = z.object({
  brandName: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
});

export const updateBrandSchema = createBrandSchema;

export type CreateFormData = z.infer<typeof createBrandSchema>;
export type UpdateFormData = z.infer<typeof updateBrandSchema>;
