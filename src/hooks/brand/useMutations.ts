import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BrandService } from '@/services/brand.service';
import { useToast } from '@/hooks/use-toast';

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

  return {
    createMutation,
  };
};
