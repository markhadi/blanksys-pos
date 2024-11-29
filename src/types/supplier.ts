import { CreateFormData, UpdateFormData } from '@/schema/supplier';
import { SortingState } from '@tanstack/react-table';

export interface SupplierType {
  id: number;
  supplierName: string;
  contact: string;
  address: string;
}

export interface SupplierTableProps {
  data: SupplierType[];
  isLoading?: boolean;
  onEdit: (supplier: SupplierType) => void;
  onDelete: (supplier: SupplierType) => void;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
}

export interface SupplierSearchParams {
  search?: string;
  sorting?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface SupplierFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFormData | UpdateFormData) => void;
  supplier?: SupplierType;
  mode: 'add' | 'edit';
  isLoading?: boolean;
}
