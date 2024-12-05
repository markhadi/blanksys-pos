import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { MenuItemProps } from '@/types/layout';
import IconBack from '@/assets/icons/solar_backspace-outline.svg';

export const MenuItem = ({
  path,
  label,
  icon,
  isSubItem = false,
  isActive,
  onClick,
}: MenuItemProps) => (
  <Link
    to={path}
    onClick={onClick}
    className={`
      font-inter font-normal text-[16px] leading-[28px] 
      flex items-center gap-[10px] px-[15px] py-[10px] 
      transition-all duration-200 
      hover:bg-[#E2E8F0] hover:outline-[1.5px] 
      hover:outline-[#CBD5E1] hover:outline-offset-0 
      hover:rounded-[15px]
      ${isSubItem ? 'ml-9' : ''}
      ${
        isActive
          ? 'bg-[#E2E8F0] outline-[1.5px] outline-[#CBD5E1] rounded-[15px]'
          : 'text-[#64748B]'
      }
    `}
  >
    {icon === 'solar:backspace-outline' ? (
      <img src={IconBack} alt="back" height={24} width={24} />
    ) : (
      <Icon height={24} width={24} icon={icon} />
    )}
    <span>{label}</span>
  </Link>
);
