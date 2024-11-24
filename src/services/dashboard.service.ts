import {
  DashboardResponse,
  DashboardCardData,
  CardData,
  TrendDirection,
  MetricData,
} from '@/types/dashboard';
import dashboardData from '@/data/dashboard-card.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createResponse = (data: CardData[]): DashboardResponse => ({
  success: true,
  message: 'Data retrieved successfully',
  data,
});

const isTrendDirection = (trend: string): trend is TrendDirection => {
  return trend === 'up' || trend === 'down';
};

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
    {
      title: "Today's Gross Profit",
      value: data.todayGrossProfit.value,
      trend: {
        value: Math.abs(data.todayGrossProfit.percentageChange),
        isUp: data.todayGrossProfit.trend === 'up',
        text: `${
          data.todayGrossProfit.trend === 'up' ? 'Up' : 'Down'
        } from yesterday`,
      },
      type: 'primary',
    },
    {
      title: "Today's Net Profit",
      value: data.todayNetProfit.value,
      trend: {
        value: Math.abs(data.todayNetProfit.percentageChange),
        isUp: data.todayNetProfit.trend === 'up',
        text: `${
          data.todayNetProfit.trend === 'up' ? 'Up' : 'Down'
        } from yesterday`,
      },
      type: 'success',
    },
    {
      title: "Today's Item Receipt",
      value: data.todayItemReceipt.value,
      trend: {
        value: Math.abs(data.todayItemReceipt.percentageChange),
        isUp: data.todayItemReceipt.trend === 'up',
        text: `${
          data.todayItemReceipt.trend === 'up' ? 'Up' : 'Down'
        } from yesterday`,
      },
      type: 'info',
    },
    {
      title: "Today's Estimation Loss",
      value: data.todayEstimationLoss.value,
      trend: {
        value: Math.abs(data.todayEstimationLoss.percentageChange),
        isUp: data.todayEstimationLoss.trend === 'up',
        text: `${
          data.todayEstimationLoss.trend === 'up' ? 'Up' : 'Down'
        } from yesterday`,
      },
      type: 'danger',
    },
  ];
};

const transformInventoryCards = (data: DashboardCardData): CardData[] => {
  return [
    {
      title: 'Items',
      value: data.items.total,
      trend: {
        value: data.items.newAdded,
        isUp: true,
        text: 'New items added',
      },
      type: 'primary',
    },
    {
      title: 'Prices',
      value: data.prices.total,
      trend: {
        value: data.prices.newAdded,
        isUp: true,
        text: 'New prices added',
      },
      type: 'success',
    },
    {
      title: 'Brands',
      value: data.brands.total,
      trend: {
        value: data.brands.newAdded,
        isUp: true,
        text: 'New brands added',
      },
      type: 'info',
    },
    {
      title: 'Categories',
      value: data.categories.total,
      trend: {
        value: data.categories.newAdded,
        isUp: true,
        text: 'New categories added',
      },
      type: 'danger',
    },
    {
      title: 'Received Spending',
      value: data.receivedSpending.value,
      trend: {
        value: Math.abs(data.receivedSpending.percentageChange),
        isUp: data.receivedSpending.trend === 'up',
        text: `${
          data.receivedSpending.trend === 'up' ? 'Up' : 'Down'
        } from yesterday`,
      },
      type: 'warning',
    },
  ];
};

const transformCashierCards = (data: DashboardCardData): CardData[] => {
  return [
    {
      title: "Today's Gross Profit",
      value: data.todayGrossProfit.value,
      trend: {
        value: Math.abs(data.todayGrossProfit.percentageChange),
        isUp: data.todayGrossProfit.trend === 'up',
        text: `${
          data.todayGrossProfit.trend === 'up' ? 'Up' : 'Down'
        } from yesterday`,
      },
      type: 'primary',
    },
    {
      title: "Today's Net Profit",
      value: data.todayNetProfit.value,
      trend: {
        value: Math.abs(data.todayNetProfit.percentageChange),
        isUp: data.todayNetProfit.trend === 'up',
        text: `${
          data.todayNetProfit.trend === 'up' ? 'Up' : 'Down'
        } from yesterday`,
      },
      type: 'success',
    },
    {
      title: 'Yearly Gross Profit',
      value: data.yearlyGrossProfit.value,
      trend: {
        value: Math.abs(data.yearlyGrossProfit.percentageChange),
        isUp: data.yearlyGrossProfit.trend === 'up',
        text: `${
          data.yearlyGrossProfit.trend === 'up' ? 'Up' : 'Down'
        } from last year`,
      },
      type: 'warning',
    },
    {
      title: 'Yearly Net Profit',
      value: data.yearlyNetProfit.value,
      trend: {
        value: Math.abs(data.yearlyNetProfit.percentageChange),
        isUp: data.yearlyNetProfit.trend === 'up',
        text: `${
          data.yearlyNetProfit.trend === 'up' ? 'Up' : 'Down'
        } from last year`,
      },
      type: 'info',
    },
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
