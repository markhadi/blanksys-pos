import users from '@/data/user.json';
import { AuthResponse, LoginFormType, User } from '@/types/auth';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  login: async (credentials: LoginFormType): Promise<AuthResponse> => {
    // Simulate API delay
    await delay(1000);

    const user = (users as User[]).find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (!user) {
      return {
        success: false,
        message: 'Invalid username or password',
      };
    }

    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
    };
  },
};
