import { useQuery } from '@tanstack/react-query';
import { ReceiveService } from '@/services/receive.service';
import { Receive, ReceiveSearchParams, ReceiveTableRow } from '@/types/receive';

export const useReceives = (params: ReceiveSearchParams) => {
  return useQuery<Receive | ReceiveTableRow[]>({
    queryKey: ['receives', params],
    queryFn: () => ReceiveService.fetchReceives(params),
    select: (data) => {
      if (params.id_receive || params.id_po) return data as Receive;
      return data as ReceiveTableRow[];
    },
  });
};
