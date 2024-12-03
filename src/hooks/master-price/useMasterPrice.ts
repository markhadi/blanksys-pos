import { useQuery } from '@tanstack/react-query';
import { MasterPriceService } from '@/services/masterPrice.service';
import { MasterPriceSearchParams } from '@/types/master-price';

export const useMasterPrices = (params: MasterPriceSearchParams) => {
  return useQuery({
    queryKey: ['masterPrices', params],
    queryFn: () => MasterPriceService.fetchMasterPrices(params),
  });
};
