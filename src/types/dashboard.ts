export type CardType = 'primary' | 'success' | 'info' | 'danger' | 'warning';
export type DashboardTab = 'general' | 'inventory' | 'cashier';

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

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: CardData[];
}

export interface DashboardFilter {
  year: string;
  tab: DashboardTab;
}
