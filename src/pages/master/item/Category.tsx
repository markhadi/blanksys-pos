import { TableCategory } from '@/components/category/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { useCategories } from '@/hooks/useCategories';
import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { FormCategory } from '@/components/category/FormCategory';
import { Category as CategoryType } from '@/types/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '@/services/category.service';
import { CreateFormData, UpdateFormData } from '@/schema/category';
import { useToast } from '@/hooks/use-toast';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';

export const Category = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const [formDialog, setFormDialog] = useState({
    open: false,
    mode: 'add' as 'add' | 'edit',
    category: undefined as CategoryType | undefined,
  });

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    category: undefined as CategoryType | undefined,
  });

  const { data: categories = [], isLoading } = useCategories({
    search: searchQuery,
    sorting:
      sorting.length > 0
        ? {
            field: sorting[0].id,
            order: sorting[0].desc ? 'desc' : 'asc',
          }
        : undefined,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: CategoryService.createCategory,
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setFormDialog({ ...formDialog, open: false });
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
      setFormDialog({ ...formDialog, open: false });
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
        description: 'Failed to update category. Please try again.',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => CategoryService.deleteCategory(id),
    onSuccess: (deletedCategory) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setDeleteDialog({ open: false, category: undefined });
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

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleCreate = () => {
    setFormDialog({ open: true, mode: 'add', category: undefined });
  };

  const handleEdit = (category: CategoryType) => {
    setFormDialog({ open: true, mode: 'edit', category });
  };

  const handleDelete = (category: CategoryType) => {
    setDeleteDialog({ open: true, category });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.category?.id) {
      deleteMutation.mutate(deleteDialog.category.id);
    }
  };

  const handleSubmit = async (data: CreateFormData | UpdateFormData) => {
    if (formDialog.mode === 'add') {
      createMutation.mutate(data as CreateFormData);
    } else if (formDialog.category?.id) {
      updateMutation.mutate({
        id: formDialog.category.id,
        data: data as UpdateFormData,
      });
    }
  };

  return (
    <div className="flex-grow">
      <ActionHeader
        searchProps={{
          value: searchValue,
          onChange: setSearchValue,
          onSearch: handleSearch,
        }}
        actionButton={{
          label: 'Add New',
          onClick: handleCreate,
        }}
      />

      <TableCategory
        data={categories}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sorting={sorting}
        onSortingChange={setSorting}
      />

      <FormCategory
        mode={formDialog.mode}
        open={formDialog.open}
        category={formDialog.category}
        onClose={() => setFormDialog({ ...formDialog, open: false })}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={() => setDeleteDialog({ ...deleteDialog, open: false })}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.category?.categoryName || ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
