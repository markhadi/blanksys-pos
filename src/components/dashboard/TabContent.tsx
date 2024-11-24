import { useState, useEffect } from 'react';
import { DashboardCardGroup } from '@/components/dashboard/DashboardCardGroup';
import {
  ChartGeneral,
  ChartDailyReceiveSpending,
  ChartYearlyReceiveSpending,
  ChartYearlySellingCashier,
} from '@/components/dashboard/DashboardChart';
import { TableLatestTransactions } from '@/components/dashboard/TableLatestTransactions';
import { TablePopularProducts } from '@/components/dashboard/TablePopularProducts';
import { TableStockReceiptOrIssue } from '@/components/dashboard/TableStockReceiptOrIssue';
import { DashboardTab } from '@/types/dashboard';
import { TAB_TITLES } from '@/constants/dashboard';
import { chartService } from '@/services/chart.service';

interface TabContentProps {
  tab: DashboardTab;
  year: string;
}

export const TabContent = ({ tab, year }: TabContentProps) => {
  const [selectedYear, setSelectedYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState<number>(() => {
    const currentMonth = chartService.getCurrentMonth();
    const availableMonths = chartService.getAvailableMonths(year);

    if (availableMonths.length > 0) {
      if (availableMonths.includes(currentMonth)) {
        return currentMonth;
      }
      return availableMonths[availableMonths.length - 1];
    }
    return currentMonth;
  });

  useEffect(() => {
    setSelectedYear(year);
  }, [year]);

  useEffect(() => {
    const availableMonths = chartService.getAvailableMonths(selectedYear);
    const currentMonth = chartService.getCurrentMonth();

    if (availableMonths.length > 0) {
      if (availableMonths.includes(currentMonth)) {
        setCurrentMonth(currentMonth);
      } else {
        setCurrentMonth(availableMonths[availableMonths.length - 1]);
      }
    }
  }, [selectedYear]);

  const renderCharts = () => {
    switch (tab) {
      case 'general':
        return (
          <div className="space-y-6">
            <ChartGeneral
              key={`general-${selectedYear}-${currentMonth}`}
              year={selectedYear}
              month={currentMonth}
              onYearChange={setSelectedYear}
              onMonthChange={setCurrentMonth}
            />
            <div className="grid grid-cols-1 gap-5 2xl:grid-cols-3">
              <TableLatestTransactions />
              <TablePopularProducts />
              <TableStockReceiptOrIssue />
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div className="space-y-6">
            <ChartYearlyReceiveSpending
              key={`yearly-spend-${selectedYear}`}
              year={selectedYear}
              onYearChange={setSelectedYear}
            />
            <ChartDailyReceiveSpending
              key={`daily-spend-${selectedYear}-${currentMonth}`}
              year={selectedYear}
              month={currentMonth}
              onYearChange={setSelectedYear}
              onMonthChange={setCurrentMonth}
            />
          </div>
        );
      case 'cashier':
        return (
          <div className="space-y-6">
            <ChartYearlySellingCashier
              key={`yearly-sales-${selectedYear}`}
              year={selectedYear}
              onYearChange={setSelectedYear}
            />
            <ChartGeneral
              key={`general-cashier-${selectedYear}-${currentMonth}`}
              year={selectedYear}
              month={currentMonth}
              onYearChange={setSelectedYear}
              onMonthChange={setCurrentMonth}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <DashboardCardGroup
        variant={tab}
        title={TAB_TITLES[tab]}
        year={selectedYear}
      />
      {renderCharts()}
    </div>
  );
};
