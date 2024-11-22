import '@/styles/login.css';
import { LoginDesktopView } from '@/components/auth/LoginDesktopView';
import { LoginMobileView } from '@/components/auth/LoginMobileView';
import { LoginFormType } from '@/types/auth';
import { authService } from '@/services/auth.service';
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: LoginFormType) => {
      try {
        const response = await authService.login(values);

        if (response.success && response.user) {
          toast({
            title: 'Success',
            description: response.message,
          });

          localStorage.setItem('user', JSON.stringify(response.user));
          const redirectPath =
            response.user.role === 'Administrator' ? '/admin' : '/cashier';
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
    [toast, navigate]
  );

  return (
    <div className="login-container">
      <LoginDesktopView onSubmit={handleSubmit} />
      <LoginMobileView onSubmit={handleSubmit} />
    </div>
  );
};
