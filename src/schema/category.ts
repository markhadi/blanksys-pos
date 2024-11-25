import { z } from 'zod';

export const createCategorySchema = z.object({
  categoryName: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
});

export const updateCategorySchema = createCategorySchema;

export type CreateFormData = z.infer<typeof createCategorySchema>;
export type UpdateFormData = z.infer<typeof updateCategorySchema>;
