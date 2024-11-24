import { SalesData, ChartDataPoint } from '@/types/dashboard';

export const transformChartData = (data: SalesData[]): ChartDataPoint[] => {
  return data.map((item) => ({
    day: item.day,
    month: item.month,
    sales: item.sales,
    spend: item.spend,
  }));
};

export const getMonthName = (month: number | string): string => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (typeof month === 'string' && isNaN(parseInt(month))) {
    return month.slice(0, 3);
  }

  const monthIndex = typeof month === 'string' ? parseInt(month) : month;
  if (isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) {
    return '';
  }

  return months[monthIndex];
};
