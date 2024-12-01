import { FormMasterItem } from '@/components/master-item/FormMasterItem';
import { TableMasterItem } from '@/components/master-item/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { useMasterItemDialogs } from '@/hooks/master-item/useDialogs';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { useMasterItemMutations } from '@/hooks/master-item/useMutations';
import { CreateMasterItemFormData } from '@/schema/master-item';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';

export const MasterItem = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const { data: masterItems = [], isLoading } = useMasterItems({
    search: searchQuery,
    categories: selectedCategories,
    brands: selectedBrands,
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
  } = useMasterItemDialogs();

  const { createMutation, updateMutation } = useMasterItemMutations();

  const handleSubmit = async (data: CreateMasterItemFormData) => {
    if (formDialog.mode === 'add') {
      await createMutation.mutateAsync(data);
    } else if (formDialog.masterItem?.id) {
      await updateMutation.mutateAsync({
        id: formDialog.masterItem.id,
        data,
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

      <TableMasterItem
        data={masterItems}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        onView={openDetailDialog}
        sorting={sorting}
        onSortingChange={setSorting}
        onCategoryFilter={handleCategoryFilter}
        onBrandFilter={handleBrandFilter}
      />

      <FormMasterItem
        open={formDialog.open}
        onClose={closeFormDialog}
        onSubmit={handleSubmit}
        masterItem={formDialog.masterItem}
        mode={formDialog.mode}
        isLoading={false}
      />
    </div>
  );
};
