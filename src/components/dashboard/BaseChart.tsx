import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CHART_CONFIG } from '@/constants/dashboard';
import { formatters } from '@/utils/formatters';
import { getMonthName } from '@/utils/chart';
import { BaseChartProps } from '@/types/dashboard';
import { MonthSelector } from '@/components/dashboard/MonthSelector';
import { YearSelector } from '@/components/dashboard/YearSelector';

export const BaseChart = ({
  title,
  data,
  dataKey,
  xAxisKey,
  year,
  month,
  availableYears,
  availableMonths = [],
  onYearChange,
  onMonthChange,
  showMonthSelector = false,
}: BaseChartProps) => {
  return (
    <Card className="max-h-[444px] h-full shadow-md rounded-[16px]">
      <CardHeader className="pb-6 pt-6 sm:pb-16 sm:pt-9">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="font-bold text-[18px] sm:text-[24px] leading-[20px] text-[#202224] tracking-normal">
            {title}
          </CardTitle>
          <div className="flex gap-2">
            {showMonthSelector && onMonthChange && month !== undefined && (
              <MonthSelector
                months={availableMonths}
                selectedMonth={month}
                onMonthChange={onMonthChange}
              />
            )}
            <YearSelector
              years={availableYears}
              selectedYear={year}
              onYearChange={onYearChange}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer className="max-h-[300px] w-full" config={CHART_CONFIG}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 48, right: 48 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                xAxisKey === 'month' ? getMonthName(value) : value
              }
            />
            <YAxis
              tickFormatter={formatters.number}
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
