export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
  },
  DASHBOARD: '/dashboard',
  CASHIER: {
    ROOT: '/cashier',
    TRANSACTION: '/transaction',
  },
  MASTER: {
    ITEM: {
      ROOT: '/master-item',
      CATEGORY: '/master-item/category',
      BRAND: '/master-item/brand',
      UNITS: '/master-item/units',
    },
    PRICE: '/master-price',
  },
  INVENTORY: {
    PURCHASE_ORDER: '/purchase-order',
    CREATE_PURCHASE_ORDER: '/purchase-order/create-po',
    EDIT_PURCHASE_ORDER: '/purchase-order/edit/:id',
    SUPPLIER: '/supplier',
    RECEIVE: '/receive',
    CREATE_RECEIVE: '/receive/create',
    EDIT_RECEIVE: '/receive/edit/:id',
    ISSUED: '/issued',
  },
  SETTINGS: {
    USER_MANAGER: '/user-manager',
  },
} as const;
