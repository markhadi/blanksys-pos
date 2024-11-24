import { useState } from 'react';
import { chartService } from '@/services/chart.service';

interface ChartStateProps {
  initialYear: string;
  initialMonth?: number;
}

export const useChartState = ({
  initialYear,
  initialMonth,
}: ChartStateProps) => {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(
    initialMonth ?? chartService.getCurrentMonth()
  );
  const availableMonths = chartService.getAvailableMonths(year);

  const handleYearChange = (newYear: string) => {
    setYear(newYear);

    const monthsInYear = chartService.getAvailableMonths(newYear);
    if (monthsInYear.length > 0 && !monthsInYear.includes(month)) {
      setMonth(monthsInYear[0]);
    }
  };

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
  };

  return {
    year,
    month,
    availableMonths,
    handleYearChange,
    handleMonthChange,
  };
};
