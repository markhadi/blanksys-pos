import { useQuery } from '@tanstack/react-query';
import { IssuedService } from '@/services/issued.service';
import { Issued, IssuedSearchParams, IssuedTableRow } from '@/types/issued';

export const useIssued = (params: IssuedSearchParams) => {
  return useQuery<Issued | IssuedTableRow[]>({
    queryKey: ['issueds', params],
    queryFn: () => IssuedService.fetchIssued(params),
    select: (data) => {
      if (params.id) return data as Issued;
      return data as IssuedTableRow[];
    },
  });
};
