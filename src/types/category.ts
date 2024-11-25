import { CreateFormData, UpdateFormData } from '@/schema/category';
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

export interface CategoriesFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFormData | UpdateFormData) => void;
  category?: Category;
  mode: 'add' | 'edit';
  isLoading?: boolean;
}
