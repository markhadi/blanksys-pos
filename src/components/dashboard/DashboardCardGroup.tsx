import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { DashboardCardSkeleton } from '@/components/dashboard/DashboardCardSkeleton';
import { useDashboardCards } from '@/hooks/useDashboardCards';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { DashboardTab } from '@/types/dashboard';

interface DashboardCardGroupProps {
  variant: DashboardTab;
  title: string;
  year: string;
}

export const DashboardCardGroup = ({
  variant,
  year,
}: DashboardCardGroupProps) => {
  const { data, isLoading, error } = useDashboardCards(variant, year);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load {variant} dashboard data
        </AlertDescription>
      </Alert>
    );
  }

  const cardCount = variant === 'inventory' ? 5 : 4;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap gap-7">
        {isLoading
          ? Array(cardCount)
              .fill(0)
              .map((_, index) => <DashboardCardSkeleton key={index} />)
          : data?.map((cardData, index) => (
              <DashboardCard key={`${variant}-${index}`} data={cardData} />
            ))}
      </div>
    </section>
  );
};
