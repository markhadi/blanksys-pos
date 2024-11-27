import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UnitService } from '@/services/unit.service';
import { UpdateFormData } from '@/schema/unit';
import { useToast } from '@/hooks/use-toast';

export const useUnitMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: UnitService.createUnit,
    onSuccess: (newUnit) => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      toast({
        title: 'Success',
        description: `Unit "${newUnit.unitName}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create unit. Please try again.',
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFormData }) =>
      UnitService.updateUnit(id, data),
    onSuccess: (updatedUnit) => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      toast({
        title: 'Success',
        description: `Unit "${updatedUnit.unitName}" has been updated`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update unit. Please try again.',
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => UnitService.deleteUnit(id),
    onSuccess: (deletedUnit) => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      toast({
        title: 'Success',
        description: `Unit "${deletedUnit.unitName}" has been deleted`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete unit. Please try again.',
      });
    },
  });
  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
