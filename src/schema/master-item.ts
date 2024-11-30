import { z } from 'zod';

export const createMasterItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  itemName: z.string().min(1, 'Item name is required'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  capitalPrice: z.number().min(0, 'Capital price must be positive'),
  stockUnit: z.string().min(1, 'Stock unit is required'),
  image: z.string().optional(),
});

export const updateMasterItemSchema = createMasterItemSchema;

export type CreateMasterItemFormData = z.infer<typeof createMasterItemSchema>;
export type UpdateMasterItemFormData = z.infer<typeof updateMasterItemSchema>;
