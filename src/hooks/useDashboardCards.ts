import { useState, useEffect } from 'react';
import { CardData, DashboardTab } from '@/types/dashboard';
import { dashboardService } from '@/services/dashboard.service';
import { useToast } from '@/hooks/use-toast';

interface DashboardCardsState {
  data: CardData[] | null;
  isLoading: boolean;
  error: Error | null;
}

export const useDashboardCards = (tab: DashboardTab, year: string) => {
  const [state, setState] = useState<DashboardCardsState>({
    data: null,
    isLoading: true,
    error: null,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        let response;
        switch (tab) {
          case 'general':
            response = await dashboardService.getGeneralCards(year);
            break;
          case 'inventory':
            response = await dashboardService.getInventoryCards(year);
            break;
          case 'cashier':
            response = await dashboardService.getCashierCards(year);
            break;
        }

        if (response.success) {
          setState({ data: response.data, isLoading: false, error: null });
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'An error occurred';
        setState({
          data: null,
          isLoading: false,
          error: error as Error,
        });
        toast({
          variant: 'destructive',
          title: 'Error',
          description: message,
        });
      }
    };

    fetchCards();
  }, [tab, year, toast]);

  return state;
};
