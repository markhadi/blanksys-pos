import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SupplierService } from '@/services/supplier.service';
import { useToast } from '@/hooks/use-toast';
import { UpdateFormData } from '@/schema/supplier';

export const useSupplierMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: SupplierService.createSupplier,
    onSuccess: (newSupplier) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast({
        title: 'Success',
        description: `Supplier "${newSupplier.supplierName}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create supplier. Please try again.',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFormData }) =>
      SupplierService.updateSupplier(id, data),
    onSuccess: (updatedSupplier) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast({
        title: 'Success',
        description: `Supplier "${updatedSupplier.supplierName}" has been updated`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update supplier. Please try again.',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => SupplierService.deleteSupplier(id),
    onSuccess: (deletedSupplier) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast({
        title: 'Success',
        description: `Supplier "${deletedSupplier.supplierName}" has been deleted`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete supplier. Please try again.',
      });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
