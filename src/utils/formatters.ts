import { CURRENCY_INDICATORS } from '@/constants/dashboard';

export const formatMetricValue = (title: string, value: number): string => {
  const needsCurrency = CURRENCY_INDICATORS.some((term) =>
    title.toLowerCase().includes(term)
  );
  return needsCurrency
    ? `$ ${formatters.number(value)}`
    : formatters.number(value);
};

export const formatters = {
  timestamp: (timestamp: string, type: 'full' | 'short' = 'full'): string => {
    const options: Intl.DateTimeFormatOptions =
      type === 'full'
        ? {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }
        : {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          };

    return new Date(timestamp).toLocaleString('en-US', options);
  },

  currency: (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  number: (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  },
};
