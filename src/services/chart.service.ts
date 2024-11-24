import {
  ChartResponse,
  SalesData,
  ChartType,
  DataType,
} from '@/types/dashboard';
import chartData from '@/data/dashboard-chart.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createResponse = (data: SalesData[]): ChartResponse => ({
  success: true,
  message: 'Data retrieved successfully',
  data,
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
  });
};

const filterDataByYear = (data: SalesData[], year: string): SalesData[] => {
  return data.filter((item) => {
    if (item.year) {
      return item.year === parseInt(year);
    }
    if (item.date) {
      return new Date(item.date).getFullYear() === parseInt(year);
    }
    return false;
  });
};

const filterDataByMonth = (data: SalesData[], month: number): SalesData[] => {
  return data.filter((item) => {
    if (item.date) {
      return new Date(item.date).getMonth() === month;
    }
    return false;
  });
};

export const chartService = {
  getChartData: async (
    type: ChartType,
    dataType: DataType,
    year: string,
    month?: number
  ): Promise<ChartResponse> => {
    try {
      await delay(500);

      let filteredData: SalesData[] = [];

      if (type === 'yearly') {
        const yearlyData =
          dataType === 'sales'
            ? chartData.salesYearly
            : chartData.receiveSpendingYearly;

        filteredData = filterDataByYear(yearlyData, year);
      } else {
        if (typeof month !== 'number') {
          throw new Error('Month is required for daily data');
        }

        const dailyData =
          dataType === 'sales'
            ? chartData.salesDaily
            : chartData.receiveSpendingDaily;

        filteredData = filterDataByYear(dailyData, year);
        filteredData = filterDataByMonth(filteredData, month);

        filteredData = filteredData.map((data) => ({
          ...data,
          day: data.date ? formatDate(data.date) : undefined,
        }));
      }

      return createResponse(filteredData);
    } catch (error) {
      console.error(`Error fetching ${type} ${dataType} data:`, error);
      throw error;
    }
  },

  getAvailableYears: (): number[] => {
    const years = new Set([
      ...chartData.salesYearly.map((item) => item.year),
      ...chartData.salesDaily.map((item) => new Date(item.date).getFullYear()),
    ]);
    return Array.from(years).sort((a, b) => b - a); // descending order
  },

  getAvailableMonths: (year: string): number[] => {
    const months = new Set(
      chartData.salesDaily
        .filter((item) => new Date(item.date).getFullYear() === parseInt(year))
        .map((item) => new Date(item.date).getMonth())
    );
    return Array.from(months).sort((a, b) => a - b);
  },

  getCurrentMonth: (): number => {
    return new Date().getMonth();
  },
};
