import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReceiveService } from '@/services/receive.service';
import { useToast } from '@/hooks/use-toast';

export const useReceiveMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: ReceiveService.createReceive,
    onSuccess: (newReceive) => {
      queryClient.invalidateQueries({ queryKey: ['receives'] });
      toast({
        title: 'Success',
        description: `Receive record "${newReceive.id_receive}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create receive record. Please try again.',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ReceiveService.deleteReceive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receives'] });
      toast({
        title: 'Success',
        description: 'Receive record deleted successfully.',
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete receive record. Please try again.',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ReceiveService.updateReceive,
    onSuccess: (updatedReceive) => {
      queryClient.invalidateQueries({ queryKey: ['receives'] });
      toast({
        title: 'Success',
        description: `Receive record "${updatedReceive.id_receive}" has been updated`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update receive record. Please try again.',
      });
    },
  });

  return {
    createMutation,
    deleteMutation,
    updateMutation,
  };
};
