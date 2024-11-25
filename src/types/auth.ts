import { z } from 'zod';

export const loginFormSchema = z.object({
  username: z.string().min(3, 'Username min 3 characters'),
  password: z.string().min(6, 'Password min 6 characters'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

/**
 * User roles
 * When API is ready:
 * - Update roles to match API's role system
 * - Consider using enum if API provides role constants
 */
export type UserRole = 'Administrator' | 'Cashier';

/**
 * User interface
 * When API is ready:
 * - Update fields to match API response
 * - Add any additional fields from API
 * - Consider splitting into UserRequest and UserResponse interfaces
 */
export interface User {
  id: number;
  username: string;
  fullName: string;
  role: UserRole;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Authentication response interface
 * When API is ready:
 * - Update to match actual API response structure
 * - Add any additional fields (e.g., refresh token, token expiry)
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: string; // JWT access token
  user?: Omit<User, 'password'>;
}
