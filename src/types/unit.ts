import { CreateFormData, UpdateFormData } from '@/schema/unit';
import { SortingState } from '@tanstack/react-table';

export interface UnitType {
  id: number;
  unitName: string;
  qty: number;
}

export interface UnitTableProps {
  data: UnitType[];
  isLoading?: boolean;
  onEdit: (unit: UnitType) => void;
  onDelete: (unit: UnitType) => void;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
}

export interface UnitSearchParams {
  search?: string;
  sorting?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface UnitsFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFormData | UpdateFormData) => void;
  unit?: UnitType;
  mode: 'add' | 'edit';
  isLoading?: boolean;
}
