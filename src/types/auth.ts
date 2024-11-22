import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z.string().min(3, 'Username min 3 characters'),
  password: z.string().min(6, 'Password min 6 characters'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: 'Administrator' | 'Cashier';
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}
