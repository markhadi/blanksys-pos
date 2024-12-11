import { useQuery } from '@tanstack/react-query';
import { PurchaseOrderService } from '@/services/purchaseOrder.service';
import {
  PurchaseOrder,
  PurchaseOrderSearchParams,
  PurchaseOrderTableRow,
} from '@/types/purchaseOrder';

export const usePurchaseOrders = (params: PurchaseOrderSearchParams) => {
  return useQuery<PurchaseOrder | PurchaseOrderTableRow[]>({
    queryKey: ['purchaseOrders', params],
    queryFn: () => PurchaseOrderService.fetchPurchaseOrders(params),
    select: (data) => {
      if (params.id_po) return data as PurchaseOrder;
      return data as PurchaseOrderTableRow[];
    },
  });
};
