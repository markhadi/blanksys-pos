import { useUser } from '@/contexts/UserContext';
import { UserRole } from '@/types/layout';

export const useAuth = () => {
  const { user } = useUser();

  const hasRole = (allowedRoles?: UserRole[]) => {
    if (!allowedRoles || allowedRoles.length === 0) return true;
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return {
    user,
    hasRole,
    isAuthenticated: !!user,
  };
};
