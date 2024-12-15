import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IssuedService } from '@/services/issued.service';
import { useToast } from '@/hooks/use-toast';

export const useIssuedMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: IssuedService.createIssued,
    onSuccess: (newIssued) => {
      queryClient.invalidateQueries({ queryKey: ['issueds'] });
      toast({
        title: 'Success',
        description: `Issued record "${newIssued.id}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create issued record. Please try again.',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: IssuedService.deleteIssued,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issueds'] });
      toast({
        title: 'Success',
        description: 'Issued record deleted successfully.',
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete issued record. Please try again.',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: IssuedService.updateIssued,
    onSuccess: (updatedIssued) => {
      queryClient.invalidateQueries({ queryKey: ['issueds'] });
      toast({
        title: 'Success',
        description: `Issued record "${updatedIssued.id}" has been updated`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update issued record. Please try again.',
      });
    },
  });

  return {
    createMutation,
    deleteMutation,
    updateMutation,
  };
};
