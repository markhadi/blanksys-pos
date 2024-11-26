import { CreateFormData, UpdateFormData } from '@/schema/brand';
import { SortingState } from '@tanstack/react-table';

export interface BrandType {
  id: number;
  brandName: string;
}

export interface BrandTableProps {
  data: BrandType[];
  isLoading?: boolean;
  onEdit: (brand: BrandType) => void;
  onDelete: (brand: BrandType) => void;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
}

export interface BrandSearchParams {
  search?: string;
  sorting?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface BrandsFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFormData | UpdateFormData) => void;
  brand?: BrandType;
  mode: 'add' | 'edit';
  isLoading?: boolean;
}
