import { DashboardCardGroup } from './DashboardCardGroup';
import { DashboardTab } from '@/types/dashboard';

interface TabContentProps {
  tab: DashboardTab;
  year: string;
}

export const TabContent = ({ tab, year }: TabContentProps) => {
  return (
    <div className="mt-6">
      <DashboardCardGroup variant={tab} title={tab} year={year} />
    </div>
  );
};
