import { MenuSection } from '@/types/layout';

export const MENU_SECTIONS: MenuSection[] = [
  {
    items: [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: 'solar:home-2-outline',
        roles: ['Administrator', 'Cashier'],
      },
    ],
  },
  {
    title: 'Cashier',
    roles: ['Cashier', 'Administrator'],
    items: [
      {
        path: '/cashier',
        label: 'Cashier',
        icon: 'solar:round-transfer-vertical-outline',
        roles: ['Cashier', 'Administrator'],
      },
      {
        path: '/transaction',
        label: 'Transaction',
        icon: 'solar:checklist-minimalistic-outline',
        roles: ['Cashier', 'Administrator'],
      },
    ],
  },
  {
    title: 'Inventory',
    roles: ['Administrator'],
    items: [
      {
        path: '/master-item',
        label: 'Master Item',
        icon: 'solar:inbox-archive-outline',
        roles: ['Administrator'],
      },
      {
        path: '/master-item/category',
        label: 'Category',
        icon: 'solar:backspace-outline',
        isSubItem: true,
        roles: ['Administrator'],
      },
      {
        path: '/master-item/brand',
        label: 'Brand',
        icon: 'solar:backspace-outline',
        isSubItem: true,
        roles: ['Administrator'],
      },
      {
        path: '/master-item/units',
        label: 'Units',
        icon: 'solar:backspace-outline',
        isSubItem: true,
        roles: ['Administrator'],
      },
      {
        path: '/master-price',
        label: 'Master Price',
        icon: 'solar:banknote-2-outline',
        roles: ['Administrator'],
      },
      {
        path: '/purchase-order',
        label: 'Purchase Order',
        icon: 'solar:clipboard-check-outline',
        roles: ['Administrator'],
      },
      {
        path: '/supplier',
        label: 'Supplier',
        icon: 'solar:inbox-out-outline',
        roles: ['Administrator'],
      },
      {
        path: '/receive',
        label: 'Receive',
        icon: 'solar:inbox-in-outline',
        roles: ['Administrator'],
      },
      {
        path: '/issued',
        label: 'Issued',
        icon: 'solar:inbox-out-outline',
        roles: ['Administrator'],
      },
    ],
  },
  {
    roles: ['Administrator'],
    items: [
      {
        path: '/user-manager',
        label: 'User Manager',
        icon: 'solar:users-group-rounded-outline',
        roles: ['Administrator'],
      },
    ],
  },
];
