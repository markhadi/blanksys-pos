import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '@/services/category.service';
import { UpdateFormData } from '@/schema/category';
import { useToast } from '@/hooks/use-toast';

export const useCategoryMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: CategoryService.createCategory,
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Success',
        description: `Category "${newCategory.categoryName}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create category. Please try again.',
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFormData }) =>
      CategoryService.updateCategory(id, data),
    onSuccess: (updatedCategory) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Success',
        description: `Category "${updatedCategory.categoryName}" has been updated`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete category. Please try again.',
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => CategoryService.deleteCategory(id),
    onSuccess: (deletedCategory) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: 'Success',
        description: `Category "${deletedCategory.categoryName}" has been deleted`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete category. Please try again.',
      });
    },
  });
  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
