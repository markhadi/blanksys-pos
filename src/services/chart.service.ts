import {
  ChartResponse,
  SalesData,
  ChartType,
  DataType,
} from '@/types/dashboard';

// Import data langsung dari file JSON
import salesYearly from '@/data/salesYearly.json';
import salesDaily from '@/data/salesDaily.json';
import receiveSpendingYearly from '@/data/receiveSpendingYearly.json';
import receiveSpendingDaily from '@/data/receiveSpendingDaily.json';

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

interface YearlyData {
  year: number;
  month: string;
  sales?: number;
  spend?: number;
}

interface DailyData {
  date: string;
  sales?: number;
  spend?: number;
}

const filterDataByYear = (
  data: (YearlyData | DailyData)[],
  year: string
): (YearlyData | DailyData)[] => {
  return data.filter((item): item is YearlyData | DailyData => {
    if ('year' in item) {
      return item.year === parseInt(year);
    }
    if ('date' in item && item.date) {
      return new Date(item.date).getFullYear() === parseInt(year);
    }
    return false;
  });
};

const filterDataByMonth = (data: DailyData[], month: number): DailyData[] => {
  return data.filter((item): item is DailyData => {
    if ('date' in item && item.date) {
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
          dataType === 'sales' ? salesYearly : receiveSpendingYearly;
        filteredData = filterDataByYear(yearlyData, year) as SalesData[];
      } else {
        if (typeof month !== 'number') {
          throw new Error('Month is required for daily data');
        }

        const dailyData =
          dataType === 'sales' ? salesDaily : receiveSpendingDaily;
        const yearFiltered = filterDataByYear(dailyData, year) as DailyData[];
        const monthFiltered = filterDataByMonth(yearFiltered, month);

        filteredData = monthFiltered.map((data) => ({
          ...data,
          day: formatDate(data.date),
        })) as SalesData[];
      }

      return createResponse(filteredData);
    } catch (error) {
      console.error(`Error fetching ${type} ${dataType} data:`, error);
      throw error;
    }
  },

  getAvailableYears: (): number[] => {
    const years = new Set([
      ...salesYearly.map((item) => item.year),
      ...salesDaily.map((item) => new Date(item.date).getFullYear()),
    ]);
    return Array.from(years).sort((a, b) => b - a);
  },

  getAvailableMonths: (year: string): number[] => {
    const months = new Set(
      salesDaily
        .filter((item) => new Date(item.date).getFullYear() === parseInt(year))
        .map((item) => new Date(item.date).getMonth())
    );
    return Array.from(months).sort((a, b) => a - b);
  },

  getCurrentMonth: (): number => {
    return new Date().getMonth();
  },
};
