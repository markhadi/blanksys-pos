import { z } from 'zod';

export const createSupplierSchema = z.object({
  supplierName: z.string().min(1, { message: 'Supplier name is required' }),
  contact: z
    .string()
    .min(1, { message: 'Contact is required' })
    .regex(/^\+62\d{9,12}$/, {
      message: 'Contact must be in format: +62812345678',
    }),
  address: z.string().min(1, { message: 'Address is required' }),
});

export const updateSupplierSchema = createSupplierSchema;

export type CreateFormData = z.infer<typeof createSupplierSchema>;
export type UpdateFormData = z.infer<typeof updateSupplierSchema>;
