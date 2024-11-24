import { NavContent } from '@/components/layout/NavContent';
import { SidebarProps } from '@/types/layout';

export const SidebarDesktop = ({ location }: SidebarProps) => (
  <aside className="sidebar h-full min-h-max hidden md:block">
    <NavContent location={location} />
  </aside>
);
