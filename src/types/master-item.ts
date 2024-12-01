import {
  CreateMasterItemFormData,
  UpdateMasterItemFormData,
} from '@/schema/master-item';
import { SortingState } from '@tanstack/react-table';

export interface MasterItem {
  id: string;
  itemName: string;
  idCategory: number;
  category: string;
  idBrand: number;
  brand: string;
  capitalPrice: number;
  stock: number;
  idStockUnit: number;
  unit: string;
  image?: string;
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

export interface MasterItemFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMasterItemFormData | UpdateMasterItemFormData) => void;
  masterItem?: MasterItem;
  mode: 'add' | 'edit' | 'detail';
  isLoading?: boolean;
}
