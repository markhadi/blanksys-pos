import { TableBrand } from '@/components/brand/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { useBrands } from '@/hooks/brand/useBrand';
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
          onClick: () => {},
        }}
      />

      <TableBrand
        data={brands}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  );
};
