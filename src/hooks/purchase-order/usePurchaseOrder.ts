import { useQuery } from '@tanstack/react-query';
import { PurchaseOrderService } from '@/services/purchaseOrder.service';
import { PurchaseOrderSearchParams } from '@/types/purchaseOrder';

export const usePurchaseOrders = (params: PurchaseOrderSearchParams = {}) => {
  return useQuery({
    queryKey: ['purchaseOrders', params],
    queryFn: () => PurchaseOrderService.fetchPurchaseOrders(params),
  });
};
