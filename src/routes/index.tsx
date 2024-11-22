import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/admin/Dashboard';
import CashierDashboard from '@/pages/cashier/Dashboard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['Administrator']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/cashier',
    element: (
      <ProtectedRoute allowedRoles={['Cashier']}>
        <CashierDashboard />
      </ProtectedRoute>
    ),
  },
]);
