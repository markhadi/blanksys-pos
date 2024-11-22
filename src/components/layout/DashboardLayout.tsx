import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export const DashboardLayout = () => {
  return (
    <main className="container-layout">
      <Sidebar />
      <Header />
      <Outlet />
    </main>
  );
};
