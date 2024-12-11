import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PurchaseOrderService } from '@/services/purchaseOrder.service';
import { useToast } from '@/hooks/use-toast';

export const usePurchaseOrderMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: PurchaseOrderService.createPurchaseOrder,
    onSuccess: (newPO) => {
      queryClient.invalidateQueries({ queryKey: ['purchaseOrders'] });
      toast({
        title: 'Success',
        description: `Purchase Order "${newPO.id_po}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create purchase order. Please try again.',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: PurchaseOrderService.deletePurchaseOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchaseOrders'] });
      toast({
        title: 'Success',
        description: 'Purchase order deleted successfully.',
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete purchase order. Please try again.',
      });
    },
  });

  return {
    createMutation,
    deleteMutation,
  };
};
