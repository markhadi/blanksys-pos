import {
  DashboardResponse,
  DashboardCardData,
  CardData,
  MetricData,
} from '@/types/dashboard';
import { CARD_TITLES } from '@/constants/dashboard';
import {
  createMetricCard,
  createCountCard,
  isTrendDirection,
} from '@/utils/dashboard';
import dashboardData from '@/data/dashboard-card.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createResponse = (data: CardData[]): DashboardResponse => ({
  success: true,
  message: 'Data retrieved successfully',
  data,
});

const transformData = (rawData: any): DashboardCardData => {
  const transformMetric = (metric: any): MetricData => ({
    value: metric.value,
    percentageChange: metric.percentageChange,
    trend: isTrendDirection(metric.trend) ? metric.trend : 'up',
  });

  return {
    date: rawData.date,
    todayGrossProfit: transformMetric(rawData.todayGrossProfit),
    todayNetProfit: transformMetric(rawData.todayNetProfit),
    todayItemReceipt: transformMetric(rawData.todayItemReceipt),
    todayEstimationLoss: transformMetric(rawData.todayEstimationLoss),
    items: rawData.items,
    prices: rawData.prices,
    brands: rawData.brands,
    categories: rawData.categories,
    receivedSpending: transformMetric(rawData.receivedSpending),
    yearlyGrossProfit: transformMetric(rawData.yearlyGrossProfit),
    yearlyNetProfit: transformMetric(rawData.yearlyNetProfit),
  };
};

const transformGeneralCards = (data: DashboardCardData): CardData[] => {
  return [
    createMetricCard(
      CARD_TITLES.TODAY_GROSS_PROFIT,
      data.todayGrossProfit,
      'primary'
    ),
    createMetricCard(
      CARD_TITLES.TODAY_NET_PROFIT,
      data.todayNetProfit,
      'success'
    ),
    createMetricCard(
      CARD_TITLES.TODAY_ITEM_RECEIPT,
      data.todayItemReceipt,
      'info'
    ),
    createMetricCard(
      CARD_TITLES.TODAY_ESTIMATION_LOSS,
      data.todayEstimationLoss,
      'danger'
    ),
  ];
};

const transformInventoryCards = (data: DashboardCardData): CardData[] => {
  return [
    createCountCard(CARD_TITLES.ITEMS, data.items, 'primary'),
    createCountCard(CARD_TITLES.PRICES, data.prices, 'success'),
    createCountCard(CARD_TITLES.BRANDS, data.brands, 'info'),
    createCountCard(CARD_TITLES.CATEGORIES, data.categories, 'danger'),
    createMetricCard(
      CARD_TITLES.RECEIVED_SPENDING,
      data.receivedSpending,
      'warning'
    ),
  ];
};

const transformCashierCards = (data: DashboardCardData): CardData[] => {
  return [
    createMetricCard(
      CARD_TITLES.TODAY_GROSS_PROFIT,
      data.todayGrossProfit,
      'primary'
    ),
    createMetricCard(
      CARD_TITLES.TODAY_NET_PROFIT,
      data.todayNetProfit,
      'success'
    ),
    createMetricCard(
      CARD_TITLES.YEARLY_GROSS_PROFIT,
      data.yearlyGrossProfit,
      'warning',
      'last year'
    ),
    createMetricCard(
      CARD_TITLES.YEARLY_NET_PROFIT,
      data.yearlyNetProfit,
      'info',
      'last year'
    ),
  ];
};

export const dashboardService = {
  getGeneralCards: async (year: string): Promise<DashboardResponse> => {
    try {
      await delay(800);
      const filteredData = dashboardData.filter((d) => d.date.startsWith(year));
      const latestData = transformData(filteredData[0]);
      return createResponse(transformGeneralCards(latestData));
    } catch (error) {
      console.error('Error fetching general cards:', error);
      throw error;
    }
  },

  getInventoryCards: async (year: string): Promise<DashboardResponse> => {
    try {
      await delay(1000);
      const filteredData = dashboardData.filter((d) => d.date.startsWith(year));
      const latestData = transformData(filteredData[0]);
      return createResponse(transformInventoryCards(latestData));
    } catch (error) {
      console.error('Error fetching inventory cards:', error);
      throw error;
    }
  },

  getCashierCards: async (year: string): Promise<DashboardResponse> => {
    try {
      await delay(600);
      const filteredData = dashboardData.filter((d) => d.date.startsWith(year));
      const latestData = transformData(filteredData[0]);
      return createResponse(transformCashierCards(latestData));
    } catch (error) {
      console.error('Error fetching cashier cards:', error);
      throw error;
    }
  },

  getAvailableYears: (): number[] => {
    const years = new Set(
      dashboardData.map((item) => new Date(item.date).getFullYear())
    );
    return Array.from(years).sort((a, b) => b - a);
  },
};
