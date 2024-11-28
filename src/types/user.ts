import { CreateFormData, UpdateFormData } from '@/schema/user';
import { SortingState } from '@tanstack/react-table';

export interface UserType {
  id: number;
  username: string;
  fullName: string;
  role: 'Administrator' | 'Cashier';
  password: string;
}

export interface UserTableProps {
  data: UserType[];
  isLoading?: boolean;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
}

export interface UserSearchParams {
  search?: string;
  sorting?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface UsersFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateFormData | UpdateFormData) => void;
  user?: UserType;
  mode: 'add' | 'edit';
  isLoading?: boolean;
}
