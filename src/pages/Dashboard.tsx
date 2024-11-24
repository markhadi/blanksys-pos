import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { TabContent } from '@/components/dashboard/TabContent';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { YearSelector } from '@/components/dashboard/YearSelector';
import { DashboardTab } from '@/types/dashboard';
import { useAuth } from '@/hooks/useAuth';
import { useYearSelection } from '@/hooks/useYearSelection';

export const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<DashboardTab>('general');
  const { hasRole } = useAuth();
  const isAdmin = hasRole(['Administrator']);
  const { availableYears, selectedYear, setSelectedYear } = useYearSelection();

  const handleTabChange = (value: string) => {
    setSelectedTab(value as DashboardTab);
  };

  return (
    <div className="p-6">
      <Tabs
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
          <DashboardTabs isAdmin={isAdmin} />
          <YearSelector
            years={availableYears}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            disabled={availableYears.length === 0}
          />
        </div>

        <TabsContent value="general">
          <TabContent tab="general" year={selectedYear} />
        </TabsContent>
        {isAdmin && (
          <TabsContent value="inventory">
            <TabContent tab="inventory" year={selectedYear} />
          </TabsContent>
        )}
        <TabsContent value="cashier">
          <TabContent tab="cashier" year={selectedYear} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
