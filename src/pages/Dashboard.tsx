import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TabContent } from '@/components/dashboard/TabContent';
import { DashboardTab } from '@/types/dashboard';
import { useAuth } from '@/hooks/useAuth';

export const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<DashboardTab>('general');
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const { hasRole } = useAuth();
  const isAdmin = hasRole(['Administrator']);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const handleTabChange = (value: string) => {
    setSelectedTab(value as DashboardTab);
  };

  return (
    <div>
      <Tabs
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
          <TabsList className="w-full lg:max-w-[448px] flex-wrap sm:flex-nowrap">
            <TabsTrigger value="general" className="min-w-[106px]">
              General
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="inventory" className="min-w-[124px]">
                Inventory
              </TabsTrigger>
            )}
            <TabsTrigger value="cashier" className="min-w-[108px]">
              Cashier
            </TabsTrigger>
          </TabsList>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="min-w-max w-full lg:w-[180px] focus:outline-none focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
