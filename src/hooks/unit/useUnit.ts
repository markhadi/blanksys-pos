import { useQuery } from '@tanstack/react-query';
import { UnitService } from '@/services/unit.service';
import { UnitSearchParams } from '@/types/unit';

export const useUnits = (params: UnitSearchParams = {}) => {
  return useQuery({
    queryKey: ['units', params],
    queryFn: () => UnitService.fetchUnits(params),
  });
};
