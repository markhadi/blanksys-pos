import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo-header.png';
import { MobileMenuButton } from '@/components/layout/MobileMenuButton';
import { UserMenu } from '@/components/layout/UserMenu';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pageTitle = usePageTitle();

  return (
    <header className="header flex items-center px-5 sm:px-12 bg-[#1E293B] z-50">
      <Link to="/dashboard" className="flex-shrink-0 hidden sm:block">
        <img src={logo} alt="logo header" className="h-[49px]" />
      </Link>

      <MobileMenuButton
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      <div className="flex-grow h-full flex items-center justify-between">
        <h1 className="text-[#F8FAFC] font-inter text-[20px] leading-[28px] font-bold ml-5">
          {pageTitle}
        </h1>
        <UserMenu />
      </div>
    </header>
  );
};
