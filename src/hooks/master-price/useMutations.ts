import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MasterPriceService } from '@/services/masterPrice.service';
import { useToast } from '@/hooks/use-toast';
import { UpdateMasterPriceFormData } from '@/schema/master-price';

export const useMasterPriceMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: MasterPriceService.createMasterPrice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masterPrices'] });
      toast({
        title: 'Success',
        description: 'Price has been created',
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create price. Please try again.',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateMasterPriceFormData;
    }) => MasterPriceService.updateMasterPrice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masterPrices'] });
      toast({
        title: 'Success',
        description: 'Price has been updated',
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update price. Please try again.',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => MasterPriceService.deleteMasterPrice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masterPrices'] });
      toast({
        title: 'Success',
        description: 'Price has been deleted',
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete price. Please try again.',
      });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
