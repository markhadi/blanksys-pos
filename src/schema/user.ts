import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  role: z.enum(['Administrator', 'Cashier'], {
    required_error: 'Please select a role',
  }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const updateUserSchema = createUserSchema;

export type CreateFormData = z.infer<typeof createUserSchema>;
export type UpdateFormData = z.infer<typeof updateUserSchema>;
