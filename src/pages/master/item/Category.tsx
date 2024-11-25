import { TableCategory } from '@/components/category/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { useCategories } from '@/hooks/useCategories';
import { useState, useMemo } from 'react';

export const Category = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data: categories = [], isLoading } = useCategories();

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.categoryName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [categories, searchValue]);

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
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
        data={filteredCategories}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
};
