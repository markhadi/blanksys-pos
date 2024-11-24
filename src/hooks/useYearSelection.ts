import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboard.service';

export const useYearSelection = () => {
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    const years = dashboardService.getAvailableYears();
    setAvailableYears(years);

    if (years.length > 0 && !selectedYear) {
      setSelectedYear(years[0].toString());
    }
  }, []);

  return {
    availableYears,
    selectedYear,
    setSelectedYear,
  };
};
