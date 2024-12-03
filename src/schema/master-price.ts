import { z } from 'zod';

export const createMasterPriceSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  id_item: z.string().min(1, 'Item ID is required'),
  id_unit: z.number().min(1, 'Unit is required'),
  capital_price: z.number().min(0, 'Capital price must be positive'),
  selling_price: z.number().min(0, 'Selling price must be positive'),
  category: z.string(),
  brand: z.string(),
});

export const updateMasterPriceSchema = createMasterPriceSchema;

export type CreateMasterPriceFormData = z.infer<typeof createMasterPriceSchema>;
export type UpdateMasterPriceFormData = z.infer<typeof updateMasterPriceSchema>;
