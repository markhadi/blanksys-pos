import { formatNumber } from '@/lib/utils';
import { CURRENCY_INDICATORS } from '@/constants/dashboard';

export const formatMetricValue = (title: string, value: number): string => {
  const needsCurrency = CURRENCY_INDICATORS.some((term) =>
    title.toLowerCase().includes(term)
  );
  return needsCurrency ? `$ ${formatNumber(value)}` : formatNumber(value);
};
