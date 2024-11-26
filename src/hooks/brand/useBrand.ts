import { useQuery } from '@tanstack/react-query';
import { BrandService } from '@/services/brand.service';
import { BrandSearchParams } from '@/types/brand';

export const useBrands = (params: BrandSearchParams = {}) => {
  return useQuery({
    queryKey: ['brands', params],
    queryFn: () => BrandService.fetchBrands(params),
  });
};
