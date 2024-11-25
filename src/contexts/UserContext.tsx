import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { User, UserRole } from '@/types/auth';
import { authService } from '@/services/auth.service';

interface UserContextType {
  user: Omit<User, 'password'> | null;
  setUser: (user: Omit<User, 'password'> | null) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (roles?: UserRole[]) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = useCallback(async () => {
    await authService.logout();
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (allowedRoles?: UserRole[]) => {
      if (!allowedRoles || allowedRoles.length === 0) return true;
      if (!user) return false;
      return allowedRoles.includes(user.role);
    },
    [user]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
