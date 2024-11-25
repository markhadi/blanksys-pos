import { TableCategory } from '@/components/category/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { useCategories } from '@/hooks/useCategories';
import { useState } from 'react';
import { SortingState } from '@tanstack/react-table';
import { FormCategory } from '@/components/category/FormCategory';
import { CategoryFormData, Category as CategoryType } from '@/types/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '@/services/category.service';
import { CreateFormData, UpdateFormData } from '@/schema/category';
import { useToast } from '@/hooks/use-toast';

export const Category = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const [formDialog, setFormDialog] = useState({
    open: false,
    mode: 'add' as 'add' | 'edit',
    category: undefined as CategoryFormData | undefined,
  });

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

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: CategoryService.createCategory,
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setFormDialog({ ...formDialog, open: false });
      toast({
        title: 'Success',
        description: `Category "${newCategory.categoryName}" has been created`,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create category. Please try again.',
      });
    },
  });

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleCreate = () => {
    setFormDialog({ open: true, mode: 'add', category: undefined });
  };

  const handleEdit = (category: CategoryType) => {
    setFormDialog({ open: true, mode: 'edit', category });
  };

  const handleSubmit = async (data: CreateFormData | UpdateFormData) => {
    if (formDialog.mode === 'add') {
      createMutation.mutate(data as CreateFormData);
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
          onClick: handleCreate,
        }}
      />

      <TableCategory
        data={categories}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={() => {}}
        sorting={sorting}
        onSortingChange={setSorting}
      />

      <FormCategory
        mode={formDialog.mode}
        open={formDialog.open}
        category={formDialog.category}
        onClose={() => setFormDialog({ ...formDialog, open: false })}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
      />
    </div>
  );
};
