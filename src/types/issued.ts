import { OnChangeFn, SortingState } from '@tanstack/react-table';

export type IssuedStatus = 'Pending' | 'Approved' | 'Rejected';

export interface IssuedItem {
  id: string;
  itemName: string;
  category: string;
  brand: string;
  qty: number;
  unit: string;
  capital_price: number;
  selling_price: number;
  total: number;
  reason: string;
  estimationLoss: number;
}

export interface Issued {
  id: string;
  date: string;
  issuedBy: string;
  items: IssuedItem[];
}

export interface IssuedTableRow {
  id: string;
  date: string;
  issuedBy: string;
  items: IssuedItem[];
}

export const toIssuedTableRow = (issued: Issued): IssuedTableRow => ({
  id: issued.id,
  date: issued.date,
  issuedBy: issued.issuedBy,
  items: issued.items,
});

export interface IssuedSearchParams {
  search?: string;
  issuedBy?: string[];
  sorting?: {
    field: keyof IssuedTableRow;
    order: 'asc' | 'desc';
  };
  id?: string;
}

export interface IssuedTableProps {
  data: IssuedTableRow[];
  isLoading: boolean;
  onEdit: (issued: IssuedTableRow) => void;
  onDelete: (issued: IssuedTableRow) => void;
  onView: (issued: IssuedTableRow) => void;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  onIssuedByFilter: (issuers: string[]) => void;
}

export interface TableIssuedItemProps {
  data: IssuedItem[];
  isLoading: boolean;
  onEdit: (item: IssuedItem) => void;
  onDelete: (item: IssuedItem) => void;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}
