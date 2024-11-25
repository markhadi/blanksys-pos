import { SortingState } from '@tanstack/react-table';

export interface Category {
  id: number;
  categoryName: string;
}

export interface CategoryTableProps {
  data: Category[];
  isLoading?: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
}

export interface CategorySearchParams {
  search?: string;
  sorting?: {
    field: string;
    order: 'asc' | 'desc';
  };
}
