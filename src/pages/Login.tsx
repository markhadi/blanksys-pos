import '@/styles/login.css';
import { LoginDesktopView } from '@/components/auth/LoginDesktopView';
import { LoginMobileView } from '@/components/auth/LoginMobileView';
import { LoginFormType } from '@/types/auth';
import { authService } from '@/services/auth.service';
import { useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { ROUTES } from '@/constants/routes';

export const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (user) {
      const redirectPath =
        user.role === 'Administrator' ? ROUTES.DASHBOARD : ROUTES.CASHIER.ROOT;
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = useCallback(
    async (values: LoginFormType) => {
      try {
        const response = await authService.login(values);

        if (response.success && response.user) {
          setUser(response.user);

          toast({
            title: 'Success',
            description: response.message,
          });

          const redirectPath =
            response.user.role === 'Administrator'
              ? ROUTES.DASHBOARD
              : ROUTES.CASHIER.ROOT;
          navigate(redirectPath);
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: response.message,
          });
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An unexpected error occurred',
        });
      }
    },
    [toast, navigate, setUser]
  );

  if (user) {
    return null;
  }

  return (
    <div className="login-container">
      <LoginDesktopView onSubmit={handleSubmit} />
      <LoginMobileView onSubmit={handleSubmit} />
    </div>
  );
};
