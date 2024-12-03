import {
  CreateMasterPriceFormData,
  UpdateMasterPriceFormData,
} from '@/schema/master-price';
import { SortingState } from '@tanstack/react-table';

export interface MasterPrice {
  id: string;
  id_item: string;
  id_unit: number;
  unit: string;
  capital_price: number;
  selling_price: number;
  itemName: string;
  category: string;
  brand: string;
  stock: number;
}

export interface MasterPriceDataType {
  id: string;
  id_item: string;
  id_unit: number;
  capital_price: number;
  selling_price: number;
}

export interface MasterPriceTableProps {
  data: MasterPrice[];
  isLoading?: boolean;
  onEdit: (price: MasterPrice) => void;
  onDelete: (price: MasterPrice) => void;
  onView: (price: MasterPrice) => void;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
  onCategoryFilter: (categories: string[]) => void;
  onBrandFilter: (brands: string[]) => void;
}

export interface MasterPriceSearchParams {
  search?: string;
  sorting?: {
    field: string;
    order: 'asc' | 'desc';
  };
  categories?: string[];
  brands?: string[];
  units?: string[];
}

export interface MasterPriceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateMasterPriceFormData | UpdateMasterPriceFormData
  ) => void;
  masterPrice?: MasterPrice;
  mode: 'add' | 'edit' | 'detail';
  isLoading?: boolean;
}
