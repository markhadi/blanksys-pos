import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MasterItemService } from '@/services/masterItem.service';
import { useToast } from '@/hooks/use-toast';
import { UpdateMasterItemFormData } from '@/schema/master-item';

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

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateMasterItemFormData;
    }) => MasterItemService.updateMasterItem(id, data),
    onSuccess: (updatedItem) => {
      queryClient.invalidateQueries({ queryKey: ['masterItems'] });
      toast({
        title: 'Success',
        description: `Item "${updatedItem.itemName}" has been updated`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update item. Please try again.',
      });
    },
  });

  return {
    createMutation,
    updateMutation,
  };
};
