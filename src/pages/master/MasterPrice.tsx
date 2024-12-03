import { FormMasterPrice } from '@/components/master-price/FormMasterPrice';
import { TableMasterPrice } from '@/components/master-price/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useMasterPriceDialogs } from '@/hooks/master-price/useDialogs';
import { useMasterPrices } from '@/hooks/master-price/useMasterPrice';
import { useMasterPriceMutations } from '@/hooks/master-price/useMutations';
import { CreateMasterPriceFormData } from '@/schema/master-price';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';

export const MasterPrice = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data: masterPrices = [], isLoading } = useMasterPrices({
    search: searchQuery,
    sorting:
      sorting.length > 0
        ? {
            field: sorting[0].id,
            order: sorting[0].desc ? 'desc' : 'asc',
          }
        : undefined,
    categories: selectedCategories,
    brands: selectedBrands,
  });

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleCategoryFilter = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleBrandFilter = (brands: string[]) => {
    setSelectedBrands(brands);
  };

  const {
    formDialog,
    openCreateDialog,
    closeFormDialog,
    openDetailDialog,
    openEditDialog,
    openDeleteDialog,
    deleteDialog,
    closeDeleteDialog,
  } = useMasterPriceDialogs();

  const { createMutation, updateMutation, deleteMutation } =
    useMasterPriceMutations();

  const handleSubmit = async (data: CreateMasterPriceFormData) => {
    if (formDialog.mode === 'add') {
      await createMutation.mutateAsync(data);
      closeFormDialog();
    } else if (formDialog.masterPrice?.id) {
      await updateMutation.mutateAsync({
        id: formDialog.masterPrice.id,
        data,
      });
      closeFormDialog();
    }
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.masterPrice?.id) {
      deleteMutation.mutate(deleteDialog.masterPrice.id);
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

      <TableMasterPrice
        data={masterPrices}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        onView={openDetailDialog}
        sorting={sorting}
        onSortingChange={setSorting}
        onCategoryFilter={handleCategoryFilter}
        onBrandFilter={handleBrandFilter}
      />

      <FormMasterPrice
        open={formDialog.open}
        onClose={closeFormDialog}
        onSubmit={handleSubmit}
        masterPrice={formDialog.masterPrice}
        mode={formDialog.mode}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.masterPrice?.itemName || ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
