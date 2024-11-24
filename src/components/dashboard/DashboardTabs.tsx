import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardTabsProps {
  isAdmin: boolean;
}

export const DashboardTabs = ({ isAdmin }: DashboardTabsProps) => (
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
);
