import { LoginForm } from './LoginForm';
import { LoginHeader } from './LoginHeader';
import { LoginBranding } from './LoginBranding';
import { LoginFormType } from '@/types/auth';
import logoTitle from '@/assets/images/Logo-and-Title.png';

interface LoginMobileViewProps {
  onSubmit: (values: LoginFormType) => Promise<void>;
}

export const LoginMobileView = ({ onSubmit }: LoginMobileViewProps) => (
  <div className="login-image-container p-6 flex 2xl:hidden">
    <div className="login-mobile-card">
      <img src={logoTitle} alt="logo-title" className="flex-shrink-0" />
      <LoginHeader className="text-center" />
      <LoginForm onSubmit={onSubmit} />
      <LoginBranding />
    </div>
  </div>
);
