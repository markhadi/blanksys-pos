import { DashboardCardGroup } from './DashboardCardGroup';
import { DashboardTab } from '@/types/dashboard';

interface TabContentProps {
  tab: DashboardTab;
  year: string;
}

export const TabContent = ({ tab, year }: TabContentProps) => {
  const titles: Record<DashboardTab, string> = {
    general: 'General',
    inventory: 'Inventory',
    cashier: 'Cashier',
  };

  return (
    <div className="mt-6">
      <DashboardCardGroup variant={tab} title={titles[tab]} year={year} />
    </div>
  );
};
