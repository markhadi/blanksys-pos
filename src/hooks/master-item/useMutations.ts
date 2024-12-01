import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MasterItemService } from '@/services/masterItem.service';
import { useToast } from '@/hooks/use-toast';

export const useMasterItemMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: MasterItemService.createMasterItem,
    onSuccess: (newItem) => {
      queryClient.invalidateQueries({ queryKey: ['masterItems'] });
      toast({
        title: 'Success',
        description: `Item "${newItem.itemName}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create item. Please try again.',
      });
    },
  });

  return {
    createMutation,
  };
};
