import { useState, useEffect } from 'react';
import { SalesData, ChartType, DataType } from '@/types/dashboard';
import { chartService } from '@/services/chart.service';

export const useChartData = (
  type: ChartType,
  dataType: DataType,
  year: string,
  month?: number
) => {
  const [data, setData] = useState<SalesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await chartService.getChartData(
          type,
          dataType,
          year,
          month
        );
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, dataType, year, month]);

  return { data, isLoading, error };
};
