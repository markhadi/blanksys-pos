import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BrandService } from '@/services/brand.service';
import { useToast } from '@/hooks/use-toast';
import { UpdateFormData } from '@/schema/brand';

export const useBrandMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: BrandService.createBrand,
    onSuccess: (newBrand) => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast({
        title: 'Success',
        description: `Brand "${newBrand.brandName}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create brand. Please try again.',
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFormData }) =>
      BrandService.updateBrand(id, data),
    onSuccess: (updatedBrand) => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast({
        title: 'Success',
        description: `Brand "${updatedBrand.brandName}" has been updated`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update brand. Please try again.',
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => BrandService.deleteBrand(id),
    onSuccess: (deletedBrand) => {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast({
        title: 'Success',
        description: `Brand "${deletedBrand.brandName}" has been deleted`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete brand. Please try again.',
      });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
