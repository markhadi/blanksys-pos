import { useState } from 'react';
import { ChevronDown, LogOut, User as UserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export const UserMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.AUTH.LOGIN);
  };

  const userInitial = user?.fullName?.charAt(0) || 'U';
  const userName = user?.fullName || 'User';
  const userRole = user?.role || 'Guest';

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-1 sm:gap-2 items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors outline-none">
          <div className="bg-[#22C55E] h-[34px] w-[34px] rounded-full grid place-content-center text-[#1E293B] text-[16px] font-bold font-inter">
            {userInitial}
          </div>
          <div className="flex flex-col">
            <span className="text-[#F8FAFC] font-inter font-medium text-[16px] leading-[19px] text-left hidden sm:block">
              {userName}
            </span>
            <span className="text-[#94A3B8] font-inter font-normal text-[14px] leading-[18px] hidden sm:block">
              {userRole}
            </span>
          </div>
          <ChevronDown
            className={`text-[#64748B] h-4 w-4 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Account</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>My Account</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 focus:bg-red-100"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
