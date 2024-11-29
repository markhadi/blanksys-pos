import { useQuery } from '@tanstack/react-query';
import { SupplierService } from '@/services/supplier.service';
import { SupplierSearchParams } from '@/types/supplier';

export const useSupplier = (params: SupplierSearchParams) => {
  return useQuery({
    queryKey: ['suppliers', params],
    queryFn: () => SupplierService.fetchSuppliers(params),
  });
};
