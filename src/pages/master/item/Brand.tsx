import { FormBrand } from '@/components/brand/FormBrand';
import { TableBrand } from '@/components/brand/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { useBrands } from '@/hooks/brand/useBrand';
import { useBrandDialogs } from '@/hooks/brand/useDialogs';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';

export const Brand = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: brands = [], isLoading } = useBrands({
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

  const { formDialog, openCreateDialog, openEditDialog, closeFormDialog } =
    useBrandDialogs();

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

      <TableBrand
        data={brands}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={() => {}}
        sorting={sorting}
        onSortingChange={setSorting}
      />

      <FormBrand
        open={formDialog.open}
        onClose={closeFormDialog}
        onSubmit={() => {}}
        brand={formDialog.brand}
        mode={formDialog.mode}
      />
    </div>
  );
};
