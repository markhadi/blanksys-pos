import { TableCategory } from '@/components/category/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { useCategories } from '@/hooks/useCategories';
import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';

export const Category = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

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

  return (
    <div className="flex-grow">
      <ActionHeader
        searchProps={{
          value: searchValue,
          onChange: setSearchValue,
          onSearch: handleSearch,
        }}
        actionButton={{ label: 'Add New', onClick: () => {} }}
      />

      <TableCategory
        data={categories}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  );
};
