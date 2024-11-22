import { MenuSection } from '@/types/layout';

export const MENU_SECTIONS: MenuSection[] = [
  {
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: 'solar:home-2-outline' },
    ],
  },
  {
    title: 'Cashier',
    items: [
      {
        path: '/cashier',
        label: 'Cashier',
        icon: 'solar:round-transfer-vertical-outline',
      },
      {
        path: '/transaction',
        label: 'Transaction',
        icon: 'solar:checklist-minimalistic-outline',
      },
    ],
  },
  {
    title: 'Inventory',
    items: [
      {
        path: '/master-item',
        label: 'Master Item',
        icon: 'solar:inbox-archive-outline',
      },
      {
        path: '/master-item/category',
        label: 'Category',
        icon: 'solar:backspace-outline',
        isSubItem: true,
      },
      {
        path: '/master-item/brand',
        label: 'Brand',
        icon: 'solar:backspace-outline',
        isSubItem: true,
      },
      {
        path: '/master-item/units',
        label: 'Units',
        icon: 'solar:backspace-outline',
        isSubItem: true,
      },
      {
        path: '/master-price',
        label: 'Master Price',
        icon: 'solar:banknote-2-outline',
      },
      {
        path: '/purchase-order',
        label: 'Purchase Order',
        icon: 'solar:clipboard-check-outline',
      },
      { path: '/supplier', label: 'Supplier', icon: 'solar:inbox-out-outline' },
      { path: '/receive', label: 'Receive', icon: 'solar:inbox-in-outline' },
      { path: '/issued', label: 'Issued', icon: 'solar:inbox-out-outline' },
    ],
  },
  {
    items: [
      {
        path: '/user-manager',
        label: 'User Manager',
        icon: 'solar:users-group-rounded-outline',
      },
    ],
  },
];
