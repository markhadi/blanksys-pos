import { SortingState } from '@tanstack/react-table';

export interface MasterItem {
  id: number;
  itemName: string;
  category: string;
  brand: string;
  capitalPrice: number;
  stock: number;
}

export interface MasterItemTableProps {
  data: MasterItem[];
  isLoading?: boolean;
  onEdit: (item: MasterItem) => void;
  onDelete: (item: MasterItem) => void;
  onView: (item: MasterItem) => void;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  onCategoryFilter: (categories: string[]) => void;
  onBrandFilter: (brands: string[]) => void;
}

export interface MasterItemSearchParams {
  search?: string;
  sorting?: {
    field: string;
    order: 'asc' | 'desc';
  };
  categories?: string[];
  brands?: string[];
}
