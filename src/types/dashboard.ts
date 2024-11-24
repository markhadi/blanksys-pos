export type CardType = 'primary' | 'success' | 'info' | 'danger' | 'warning';
export type DashboardTab = 'general' | 'inventory' | 'cashier';
export type TrendDirection = 'up' | 'down';
export type TimeFrame = 'yesterday' | 'last year';
export type ChartType = 'yearly' | 'daily';
export type DataType = 'sales' | 'spending';

export interface SalesData {
  month?: string;
  day?: string;
  date?: string;
  sales?: number;
  year?: number;
  spend?: number;
}

export interface ChartDataPoint {
  day?: string;
  month?: string;
  year?: number;
  sales?: number;
  spend?: number;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

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

export interface ChartResponse {
  success: boolean;
  message: string;
  data: SalesData[];
}

export interface DashboardFilter {
  year: string;
  tab: DashboardTab;
}

export interface ChartFilter {
  year: string;
  month?: number;
  type: ChartType;
  dataType: DataType;
}

export interface ChartProps {
  title: string;
  data: ChartDataPoint[];
  dataKey: 'sales' | 'spend';
  xAxisKey: 'day' | 'month';
  year: string;
  month?: number;
  onYearChange: (year: string) => void;
  onMonthChange?: (month: number) => void;
}

export interface ChartComponentProps {
  year: string;
  month?: number;
  onYearChange: (year: string) => void;
  onMonthChange?: (month: number) => void;
}
