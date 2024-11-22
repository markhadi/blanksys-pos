import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Auth
import { Login } from '@/pages/Login';

// Dashboard
import { Dashboard } from '@/pages/Dashboard';

// Cashier
import { Cashier } from '@/pages/cashier/Cashier';
import { Transaction } from '@/pages/cashier/Transaction';

// Master
import { MasterItem } from '@/pages/master/item/MasterItem';
import { Category } from '@/pages/master/item/Category';
import { Brand } from '@/pages/master/item/Brand';
import { Units } from '@/pages/master/item/Units';
import { MasterPrice } from '@/pages/master/MasterPrice';

// Inventory
import { PurchaseOrder } from '@/pages/inventory/PurchaseOrder';
import { Supplier } from '@/pages/inventory/Supplier';
import { Receive } from '@/pages/inventory/Receive';
import { Issued } from '@/pages/inventory/Issued';

// Settings
import { UserManager } from '@/pages/settings/UserManager';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.AUTH.LOGIN,
    element: <Login />,
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <Dashboard />,
      },
      // Cashier Routes
      {
        path: ROUTES.CASHIER.ROOT,
        element: (
          <ProtectedRoute allowedRoles={['Cashier']}>
            <Cashier />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.CASHIER.TRANSACTION,
        element: (
          <ProtectedRoute allowedRoles={['Cashier', 'Administrator']}>
            <Transaction />
          </ProtectedRoute>
        ),
      },
      // Master Routes
      {
        path: ROUTES.MASTER.ITEM.ROOT,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <MasterItem />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MASTER.ITEM.CATEGORY,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MASTER.ITEM.BRAND,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <Brand />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MASTER.ITEM.UNITS,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <Units />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MASTER.PRICE,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <MasterPrice />
          </ProtectedRoute>
        ),
      },
      // Inventory Routes
      {
        path: ROUTES.INVENTORY.PURCHASE_ORDER,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <PurchaseOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.INVENTORY.SUPPLIER,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <Supplier />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.INVENTORY.RECEIVE,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <Receive />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.INVENTORY.ISSUED,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <Issued />
          </ProtectedRoute>
        ),
      },
      // Settings Routes
      {
        path: ROUTES.SETTINGS.USER_MANAGER,
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <UserManager />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
]);
