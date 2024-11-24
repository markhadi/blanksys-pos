import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { CHART_CONFIG, CHART_TITLES } from '@/constants/dashboard';
import { useChartData } from '@/hooks/useChartData';
import { ChartProps, ChartComponentProps } from '@/types/dashboard';
import { formatNumber } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getMonthName } from '@/utils/chart';
import { chartService } from '@/services/chart.service';

export const ChartSkeleton = () => (
  <Card className="w-full h-[444px]">
    <CardHeader className="pb-6 pt-6">
      <Skeleton className="h-8 w-1/3" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[300px] w-full" />
    </CardContent>
  </Card>
);

export const ChartError = ({ message }: { message: string }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

interface ChartHeaderProps {
  title: string;
  year: string;
  month?: number;
  showMonthSelect?: boolean;
  onYearChange?: (year: string) => void;
  onMonthChange?: (month: number) => void;
}

const ChartHeader = ({
  title,
  year,
  month,
  showMonthSelect = false,
  onYearChange,
  onMonthChange,
}: ChartHeaderProps) => {
  const years = chartService.getAvailableYears();
  const months =
    month !== undefined ? chartService.getAvailableMonths(year) : [];

  return (
    <CardHeader className="pb-6 pt-6 sm:pb-16 sm:pt-9">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CardTitle className="font-bold text-[18px] sm:text-[24px] leading-[20px] text-[#202224] tracking-normal">
          {title}
        </CardTitle>
        <div className="flex gap-2">
          <Select value={year} onValueChange={onYearChange}>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {showMonthSelect && onMonthChange && month !== undefined && (
            <Select
              value={month.toString()}
              onValueChange={(value) => onMonthChange(parseInt(value))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m.toString()}>
                    {getMonthName(m)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

const BaseChart = ({
  title,
  data,
  dataKey,
  xAxisKey,
  year,
  month,
  onYearChange,
  onMonthChange,
}: ChartProps) => {
  return (
    <Card className="max-h-[444px] h-full shadow-md rounded-[16px]">
      <ChartHeader
        title={title}
        year={year}
        month={month}
        showMonthSelect={xAxisKey === 'day'}
        onYearChange={onYearChange}
        onMonthChange={onMonthChange}
      />
      <CardContent className="p-0">
        <ChartContainer className="max-h-[300px] w-full" config={CHART_CONFIG}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 48,
              right: 48,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (xAxisKey === 'month') {
                  return getMonthName(value);
                }
                return value;
              }}
            />
            <YAxis
              tickFormatter={(value) => formatNumber(value)}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={CHART_CONFIG[dataKey].color}
              fill={CHART_CONFIG[dataKey].color}
              fillOpacity={0.2}
              animationDuration={2000}
              animationBegin={0}
              isAnimationActive={true}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export const ChartGeneral = ({
  year,
  month,
  onYearChange,
  onMonthChange,
}: ChartComponentProps) => {
  const { data, isLoading, error } = useChartData(
    'daily',
    'sales',
    year,
    month
  );

  if (isLoading) return <ChartSkeleton />;
  if (error) return <ChartError message={error.message} />;

  return (
    <BaseChart
      title={CHART_TITLES.DAILY_SALES}
      data={data}
      dataKey="sales"
      xAxisKey="day"
      year={year}
      month={month}
      onYearChange={onYearChange}
      onMonthChange={onMonthChange}
    />
  );
};

export const ChartDailyReceiveSpending = ({
  year,
  month,
  onYearChange,
  onMonthChange,
}: ChartComponentProps) => {
  const { data, isLoading, error } = useChartData(
    'daily',
    'spending',
    year,
    month
  );

  if (isLoading) return <ChartSkeleton />;
  if (error) return <ChartError message={error.message} />;

  return (
    <BaseChart
      title={CHART_TITLES.DAILY_SPEND}
      data={data}
      dataKey="spend"
      xAxisKey="day"
      year={year}
      month={month}
      onYearChange={onYearChange}
      onMonthChange={onMonthChange}
    />
  );
};

export const ChartYearlyReceiveSpending = ({
  year,
  onYearChange,
}: ChartComponentProps) => {
  const { data, isLoading, error } = useChartData('yearly', 'spending', year);

  if (isLoading) return <ChartSkeleton />;
  if (error) return <ChartError message={error.message} />;

  return (
    <BaseChart
      title={CHART_TITLES.YEARLY_SPEND}
      data={data}
      dataKey="spend"
      xAxisKey="month"
      year={year}
      onYearChange={onYearChange}
    />
  );
};

export const ChartYearlySellingCashier = ({
  year,
  onYearChange,
}: ChartComponentProps) => {
  const { data, isLoading, error } = useChartData('yearly', 'sales', year);

  if (isLoading) return <ChartSkeleton />;
  if (error) return <ChartError message={error.message} />;

  return (
    <BaseChart
      title={CHART_TITLES.YEARLY_SALES}
      data={data}
      dataKey="sales"
      xAxisKey="month"
      year={year}
      onYearChange={onYearChange}
    />
  );
};
