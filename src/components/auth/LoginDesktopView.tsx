import { LoginForm } from './LoginForm';
import { LoginHeader } from './LoginHeader';
import { LoginBranding } from './LoginBranding';
import { LoginFormType } from '@/types/auth';
import logoTitle from '@/assets/images/Logo-and-Title.png';
import loginImg from '@/assets/images/img-login.png';

interface LoginDesktopViewProps {
  onSubmit: (values: LoginFormType) => Promise<void>;
}

export const LoginDesktopView = ({ onSubmit }: LoginDesktopViewProps) => (
  <>
    <div className="login-image-container hidden 2xl:flex">
      <img src={logoTitle} alt="logo-title" className="flex-shrink-0" />
      <img
        src={loginImg}
        alt="login-image"
        className="max-w-[911px] w-full flex-shrink-0 aspect-square"
      />
      <LoginBranding />
    </div>

    <div className="login-form-container hidden 2xl:flex">
      <LoginHeader />
      <div className="h-16 w-full" />
      <LoginForm onSubmit={onSubmit} />
      <div className="h-[129px] w-full" />
    </div>
  </>
);
