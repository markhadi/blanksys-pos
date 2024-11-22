import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useSidebar } from '@/hooks/useSidebar';
import '@/styles/layout.css';

export const DashboardLayout = () => {
  const { isOpen, toggle, close } = useSidebar(640);

  return (
    <main className="container-layout">
      <Header isSidebarOpen={isOpen} onToggleSidebar={toggle} />
      <Sidebar isOpen={isOpen} onClose={close} />
      <div className="main">
        <Outlet />
      </div>
    </main>
  );
};
