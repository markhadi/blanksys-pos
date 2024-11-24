import {
  CardData,
  CardType,
  CountData,
  MetricData,
  TimeFrame,
  TrendDirection,
} from '@/types/dashboard';

export const createTrendText = (
  trend: TrendDirection,
  timeframe: TimeFrame
): string => `${trend === 'up' ? 'Up' : 'Down'} from ${timeframe}`;

export const createMetricCard = (
  title: string,
  metric: MetricData,
  type: CardType,
  timeframe: TimeFrame = 'yesterday'
): CardData => ({
  title,
  value: metric.value,
  trend: {
    value: Math.abs(metric.percentageChange),
    isUp: metric.trend === 'up',
    text: createTrendText(metric.trend, timeframe),
  },
  type,
});

export const createCountCard = (
  title: string,
  data: CountData,
  type: CardType
): CardData => ({
  title,
  value: data.total,
  trend: {
    value: data.newAdded,
    isUp: true,
    text: `New ${title.toLowerCase()} added`,
  },
  type,
});

export const isTrendDirection = (trend: string): trend is TrendDirection => {
  return trend === 'up' || trend === 'down';
};
