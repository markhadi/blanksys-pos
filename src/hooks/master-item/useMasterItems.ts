import { useQuery } from '@tanstack/react-query';
import { MasterItemService } from '@/services/masterItem.service';
import { MasterItemSearchParams } from '@/types/master-item';

export const useMasterItems = (params: MasterItemSearchParams) => {
  return useQuery({
    queryKey: ['masterItems', params],
    queryFn: () => MasterItemService.fetchMasterItems(params),
  });
};
