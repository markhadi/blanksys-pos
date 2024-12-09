import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const routeTitles: Record<string, string> = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.CASHIER.ROOT]: 'Cashier',
  [ROUTES.CASHIER.TRANSACTION]: 'Transaction',
  [ROUTES.MASTER.ITEM.ROOT]: 'Master Item',
  [ROUTES.MASTER.ITEM.CATEGORY]: 'Item Categories',
  [ROUTES.MASTER.ITEM.BRAND]: 'Item Brands',
  [ROUTES.MASTER.ITEM.UNITS]: 'Item Units',
  [ROUTES.MASTER.PRICE]: 'Master Price',
  [ROUTES.INVENTORY.PURCHASE_ORDER]: 'Purchase Order',
  [ROUTES.INVENTORY.CREATE_PURCHASE_ORDER]: 'Purchase Order',
  [ROUTES.INVENTORY.SUPPLIER]: 'Supplier',
  [ROUTES.INVENTORY.RECEIVE]: 'Receive',
  [ROUTES.INVENTORY.ISSUED]: 'Issued',
  [ROUTES.SETTINGS.USER_MANAGER]: 'User Manager',
};

export const usePageTitle = () => {
  const location = useLocation();
  return routeTitles[location.pathname] || 'Dashboard';
};
