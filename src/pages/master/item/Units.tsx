import { FormUnit } from '@/components/unit/FormUnit';
import { TableUnit } from '@/components/unit/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useUnits } from '@/hooks/unit/useUnit';
import { useUnitDialogs } from '@/hooks/unit/useDialogs';
import { useUnitMutations } from '@/hooks/unit/useMutations';
import { CreateFormData, UpdateFormData } from '@/schema/unit';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';

export const Units = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: units = [], isLoading } = useUnits({
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
  } = useUnitDialogs();

  const { createMutation, updateMutation, deleteMutation } = useUnitMutations();

  const handleSubmit = async (data: CreateFormData | UpdateFormData) => {
    if (formDialog.mode === 'add') {
      createMutation.mutate(data as CreateFormData);
    } else if (formDialog.unit?.id) {
      updateMutation.mutate({ id: formDialog.unit.id, data });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.unit?.id) {
      deleteMutation.mutate(deleteDialog.unit.id);
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

      <TableUnit
        data={units}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        sorting={sorting}
        onSortingChange={setSorting}
      />

      <FormUnit
        open={formDialog.open}
        onClose={closeFormDialog}
        onSubmit={handleSubmit}
        unit={formDialog.unit}
        mode={formDialog.mode}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.unit?.unitName || ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
