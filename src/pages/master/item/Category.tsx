import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { CreateFormData, UpdateFormData } from '@/schema/category';
import { TableCategory } from '@/components/category/Table';
import { FormCategory } from '@/components/category/FormCategory';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useCategoryMutations } from '@/hooks/category/useMutations';
import { useCategoryDialogs } from '@/hooks/category/useDialogs';
import { useCategories } from '@/hooks/category/useCategories';

export const Category = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    formDialog,
    deleteDialog,
    openCreateDialog,
    openEditDialog,
    openDeleteDialog,
    closeFormDialog,
    closeDeleteDialog,
  } = useCategoryDialogs();

  const { createMutation, updateMutation, deleteMutation } =
    useCategoryMutations();

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

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.category?.id) {
      deleteMutation.mutate(deleteDialog.category.id);
      closeDeleteDialog();
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
          onClick: openCreateDialog,
        }}
      />

      <TableCategory
        data={categories}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        sorting={sorting}
        onSortingChange={setSorting}
      />

      <FormCategory
        mode={formDialog.mode}
        open={formDialog.open}
        category={formDialog.category}
        onClose={closeFormDialog}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.category?.categoryName || ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
