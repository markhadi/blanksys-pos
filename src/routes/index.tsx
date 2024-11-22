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
          <ProtectedRoute roles={['Cashier', 'Administrator']}>
            <Cashier />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.CASHIER.TRANSACTION,
        element: (
          <ProtectedRoute roles={['Cashier', 'Administrator']}>
            <Transaction />
          </ProtectedRoute>
        ),
      },
      // Master Routes
      {
        path: ROUTES.MASTER.ITEM.ROOT,
        element: (
          <ProtectedRoute roles={['Administrator']}>
            <MasterItem />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MASTER.ITEM.CATEGORY,
        element: (
          <ProtectedRoute roles={['Administrator']}>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MASTER.ITEM.BRAND,
        element: (
          <ProtectedRoute roles={['Administrator']}>
            <Brand />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MASTER.ITEM.UNITS,
        element: (
          <ProtectedRoute roles={['Administrator']}>
            <Units />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MASTER.PRICE,
        element: (
          <ProtectedRoute roles={['Administrator']}>
            <MasterPrice />
          </ProtectedRoute>
        ),
      },
      // Inventory Routes
      {
        path: ROUTES.INVENTORY.PURCHASE_ORDER,
        element: (
          <ProtectedRoute roles={['Administrator']}>
            <PurchaseOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.INVENTORY.SUPPLIER,
        element: (
          <ProtectedRoute roles={['Administrator']}>
            <Supplier />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.INVENTORY.RECEIVE,
        element: (
          <ProtectedRoute roles={['Administrator']}>
            <Receive />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.INVENTORY.ISSUED,
        element: (
          <ProtectedRoute roles={['Administrator']}>
            <Issued />
          </ProtectedRoute>
        ),
      },
      // Settings Routes
      {
        path: ROUTES.SETTINGS.USER_MANAGER,
        element: (
          <ProtectedRoute roles={['Administrator']}>
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
