import { SalesData, ChartDataPoint } from '@/types/dashboard';

export const transformChartData = (data: SalesData[]): ChartDataPoint[] => {
  return data.map((item) => ({
    day: item.day,
    month: item.month,
    sales: item.sales,
    spend: item.spend,
  }));
};

export const getMonthName = (month: number): string => {
  return new Date(2000, month).toLocaleString('en-US', { month: 'long' });
};
