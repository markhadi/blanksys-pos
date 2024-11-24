import BoxPrimary from '@/assets/icons/box-primary.svg';
import BoxSuccess from '@/assets/icons/box-success.svg';
import BoxInfo from '@/assets/icons/box-info.svg';
import BoxDanger from '@/assets/icons/box-danger.svg';
import BoxWarning from '@/assets/icons/box-warning.svg';

export const BOX_ICONS = {
  primary: BoxPrimary,
  success: BoxSuccess,
  info: BoxInfo,
  danger: BoxDanger,
  warning: BoxWarning,
} as const;

export const TIMEFRAMES = {
  YESTERDAY: 'yesterday',
  LAST_YEAR: 'last year',
} as const;

export const CARD_TITLES = {
  TODAY_GROSS_PROFIT: "Today's Gross Profit",
  TODAY_NET_PROFIT: "Today's Net Profit",
  TODAY_ITEM_RECEIPT: "Today's Item Receipt",
  TODAY_ESTIMATION_LOSS: "Today's Estimation Loss",
  ITEMS: 'Items',
  PRICES: 'Prices',
  BRANDS: 'Brands',
  CATEGORIES: 'Categories',
  RECEIVED_SPENDING: 'Received Spending',
  YEARLY_GROSS_PROFIT: 'Yearly Gross Profit',
  YEARLY_NET_PROFIT: 'Yearly Net Profit',
} as const;

export const CURRENCY_INDICATORS = ['profit', 'receipt', 'loss', 'spending'];
