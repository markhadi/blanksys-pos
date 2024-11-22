import { Location as RouterLocation } from 'react-router-dom';

export interface MenuItem {
  path: string;
  label: string;
  icon: string;
  isSubItem?: boolean;
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

export interface SidebarProps {
  location: RouterLocation;
  isOpen?: boolean;
  onClose?: () => void;
}

export interface MenuItemProps extends MenuItem {
  isActive: boolean;
  onClick?: () => void;
}

export interface NavContentProps {
  location: RouterLocation;
  onItemClick?: () => void;
}

export interface HeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}
