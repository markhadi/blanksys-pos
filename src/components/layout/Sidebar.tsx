import { useLocation } from 'react-router-dom';
import { SidebarMobile } from '@/components/layout/SidebarMobile';
import { SidebarDesktop } from '@/components/layout/SidebarDesktop';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      <SidebarMobile location={location} isOpen={isOpen} onClose={onClose} />
      <SidebarDesktop location={location} />
    </>
  );
};
