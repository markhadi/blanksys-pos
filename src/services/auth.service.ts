import users from '@/data/user.json';
import { AuthResponse, LoginFormType, User } from '@/types/auth';

/**
 * Storage keys for authentication tokens
 * When API is ready:
 * - ACCESS_TOKEN will be JWT token from API
 * - REFRESH_TOKEN will be used for token renewal
 */
const STORAGE_KEY = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

/**
 * Simulates network delay
 * Remove this when real API is implemented
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates token generation
 * When API is ready:
 * - Remove this function
 * - Use actual JWT token from API response
 */
const generateToken = (user: User): string => {
  return btoa(JSON.stringify({ userId: user.id, role: user.role }));
};

export const authService = {
  /**
   * Authenticates user credentials
   *
   * When API is ready:
   * - Replace with actual API call to /api/auth/login
   * - Expected API endpoint: POST /api/auth/login
   * - Request body: { username: string, password: string }
   * - Response: {
   *     success: boolean,
   *     message: string,
   *     data: string (JWT token),
   *     user: UserData
   *   }
   */
  login: async (credentials: LoginFormType): Promise<AuthResponse> => {
    await delay(1000);

    // Replace this block with actual API call
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

    const accessToken = generateToken(user);
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);

    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      message: 'Login successful',
      data: accessToken,
      user: userWithoutPassword,
    };
  },

  /**
   * Logs out the user
   *
   * When API is ready:
   * - Add API call to /api/auth/logout
   * - Expected API endpoint: POST /api/auth/logout
   * - Headers: { Authorization: `Bearer ${token}` }
   * - Clear tokens after successful logout
   */
  logout: async (): Promise<void> => {
    await delay(500);
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
  },

  /**
   * Refreshes the access token
   *
   * When API is ready:
   * - Implement actual token refresh using refresh token
   * - Expected API endpoint: POST /api/auth/refresh
   * - Headers: { Authorization: `Bearer ${refreshToken}` }
   * - Response: {
   *     success: boolean,
   *     data: string (new access token)
   *   }
   */
  refreshToken: async (): Promise<string | null> => {
    await delay(500);
    const currentToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    if (!currentToken) return null;

    // Replace with actual refresh token API call
    const newToken = `refreshed_${currentToken}`;
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, newToken);
    return newToken;
  },

  /**
   * Retrieves the current access token
   *
   * When API is ready:
   * - Consider adding token validation
   * - Check token expiration
   * - Trigger refresh if needed
   */
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
  },
};
