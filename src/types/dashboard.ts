export type CardType = 'primary' | 'success' | 'info' | 'danger' | 'warning';
export type DashboardTab = 'general' | 'inventory' | 'cashier';
export type TrendDirection = 'up' | 'down';
export type TimeFrame = 'yesterday' | 'last year';

// Card display types
export interface CardTrend {
  value: number;
  isUp: boolean;
  text: string;
}

export interface CardData {
  title: string;
  value: number;
  trend: CardTrend;
  type: CardType;
}

// Raw data types
export interface DashboardCardData {
  date: string;
  todayGrossProfit: MetricData;
  todayNetProfit: MetricData;
  todayItemReceipt: MetricData;
  todayEstimationLoss: MetricData;
  items: CountData;
  prices: CountData;
  brands: CountData;
  categories: CountData;
  receivedSpending: MetricData;
  yearlyGrossProfit: MetricData;
  yearlyNetProfit: MetricData;
}

export interface MetricData {
  value: number;
  percentageChange: number;
  trend: TrendDirection;
}

export interface CountData {
  total: number;
  newAdded: number;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: CardData[];
}

export interface DashboardFilter {
  year: string;
  tab: DashboardTab;
}
