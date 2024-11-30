import { TableMasterItem } from '@/components/master-item/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
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

      <TableMasterItem
        data={masterItems}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
        onView={() => {}}
        sorting={sorting}
        onSortingChange={setSorting}
        onCategoryFilter={handleCategoryFilter}
        onBrandFilter={handleBrandFilter}
      />
    </div>
  );
};
