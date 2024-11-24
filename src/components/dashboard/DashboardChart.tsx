import { CHART_TITLES } from '@/constants/dashboard';
import { useChartData } from '@/hooks/useChartData';
import { useChartState } from '@/hooks/useChartState';
import { ChartError } from '@/components/dashboard/ChartError';
import { BaseChart } from '@/components/dashboard/BaseChart';
import { chartService } from '@/services/chart.service';
import { ChartSkeleton } from '@/components/dashboard/ChartSkeleton';
import { DashboardChartProps } from '@/types/dashboard';

export const ChartGeneral = ({ year, month }: DashboardChartProps) => {
  const chartState = useChartState({ initialYear: year, initialMonth: month });
  const { data, isLoading, error } = useChartData(
    'daily',
    'sales',
    chartState.year,
    chartState.month
  );

  if (isLoading) return <ChartSkeleton />;
  if (error) return <ChartError message={error.message} />;

  return (
    <BaseChart
      title={CHART_TITLES.DAILY_SALES}
      data={data}
      dataKey="sales"
      xAxisKey="day"
      year={chartState.year}
      month={chartState.month}
      availableYears={chartService.getAvailableYears()}
      availableMonths={chartState.availableMonths}
      onYearChange={chartState.handleYearChange}
      onMonthChange={chartState.handleMonthChange}
      showMonthSelector
    />
  );
};

export const ChartDailyReceiveSpending = ({
  year,
  month,
}: DashboardChartProps) => {
  const chartState = useChartState({ initialYear: year, initialMonth: month });
  const { data, isLoading, error } = useChartData(
    'daily',
    'spending',
    chartState.year,
    chartState.month
  );

  if (isLoading) return <ChartSkeleton />;
  if (error) return <ChartError message={error.message} />;

  return (
    <BaseChart
      title={CHART_TITLES.DAILY_SPEND}
      data={data}
      dataKey="spend"
      xAxisKey="day"
      year={chartState.year}
      month={chartState.month}
      availableYears={chartService.getAvailableYears()}
      availableMonths={chartState.availableMonths}
      onYearChange={chartState.handleYearChange}
      onMonthChange={chartState.handleMonthChange}
      showMonthSelector
    />
  );
};

export const ChartYearlyReceiveSpending = ({ year }: DashboardChartProps) => {
  const chartState = useChartState({ initialYear: year });
  const { data, isLoading, error } = useChartData(
    'yearly',
    'spending',
    chartState.year
  );

  if (isLoading) return <ChartSkeleton />;
  if (error) return <ChartError message={error.message} />;

  return (
    <BaseChart
      title={CHART_TITLES.YEARLY_SPEND}
      data={data}
      dataKey="spend"
      xAxisKey="month"
      year={chartState.year}
      availableYears={chartService.getAvailableYears()}
      availableMonths={[]}
      onYearChange={chartState.handleYearChange}
    />
  );
};

export const ChartYearlySellingCashier = ({ year }: DashboardChartProps) => {
  const chartState = useChartState({ initialYear: year });
  const { data, isLoading, error } = useChartData(
    'yearly',
    'sales',
    chartState.year
  );

  if (isLoading) return <ChartSkeleton />;
  if (error) return <ChartError message={error.message} />;

  return (
    <BaseChart
      title={CHART_TITLES.YEARLY_SALES}
      data={data}
      dataKey="sales"
      xAxisKey="month"
      year={chartState.year}
      availableYears={chartService.getAvailableYears()}
      availableMonths={[]}
      onYearChange={chartState.handleYearChange}
    />
  );
};
