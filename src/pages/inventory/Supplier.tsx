import { FormSupplier } from '@/components/supplier/FormSupplier';
import { TableSupplier } from '@/components/supplier/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useSupplier } from '@/hooks/supplier/useSupplier';
import { useSupplierDialogs } from '@/hooks/supplier/useDialogs';
import { useSupplierMutations } from '@/hooks/supplier/useMutations';
import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { CreateFormData, UpdateFormData } from '@/schema/supplier';

export const Supplier = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: suppliers = [], isLoading } = useSupplier({
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

  const {
    formDialog,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
  } = useSupplierDialogs();

  const { createMutation, updateMutation, deleteMutation } =
    useSupplierMutations();

  const handleSubmit = async (data: CreateFormData | UpdateFormData) => {
    if (formDialog.mode === 'add') {
      createMutation.mutate(data as CreateFormData);
    } else if (formDialog.supplier?.id) {
      updateMutation.mutate({ id: formDialog.supplier.id, data });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.supplier?.id) {
      deleteMutation.mutate(deleteDialog.supplier.id);
      closeDeleteDialog();
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

      <TableSupplier
        data={suppliers}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        sorting={sorting}
        onSortingChange={setSorting}
      />

      <FormSupplier
        open={formDialog.open}
        onClose={closeFormDialog}
        onSubmit={handleSubmit}
        supplier={formDialog.supplier}
        mode={formDialog.mode}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.supplier?.supplierName || ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
