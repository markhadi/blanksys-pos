import { OnChangeFn, SortingState } from '@tanstack/react-table';

export type ReceiveStatus =
  | 'Complete'
  | 'Partial'
  | 'Outstanding'
  | 'Cancelled';

export interface ReceiveItem {
  id_item: string;
  item_name: string;
  category: string;
  brand: string;
  qty_order: number;
  qty_receive: number;
  units: string;
  amount: number;
  price_cut: number;
  discount: number;
  capital_price: number;
  subtotal: number;
  status: ReceiveStatus;
}

export interface Receive {
  id_receive: string;
  id_po: string;
  date: string;
  id_supplier: number;
  supplier_name: string;
  receive_by: string;
  items: ReceiveItem[];
}

export interface ReceiveTableRow {
  id_receive: string;
  id_po: string;
  date: string;
  id_supplier: number;
  supplier_name: string;
  receive_by: string;
  items: ReceiveItem[];
}

export const toReceiveTableRow = (receive: Receive): ReceiveTableRow => ({
  id_receive: receive.id_receive,
  id_po: receive.id_po,
  date: receive.date,
  id_supplier: receive.id_supplier,
  supplier_name: receive.supplier_name,
  receive_by: receive.receive_by,
  items: receive.items,
});

export interface ReceiveSearchParams {
  search?: string;
  receive_by?: string[];
  supplier_name?: string[];
  sorting?: {
    field: keyof ReceiveTableRow;
    order: 'asc' | 'desc';
  };
  id_receive?: string;
  id_po?: string;
}

export interface ReceiveTableProps {
  data: ReceiveTableRow[];
  isLoading: boolean;
  onEdit: (receive: ReceiveTableRow) => void;
  onDelete: (receive: ReceiveTableRow) => void;
  onView: (receive: ReceiveTableRow) => void;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  onReceiverFilter: (receivers: string[]) => void;
  onSupplierFilter: (suppliers: string[]) => void;
}

export interface TableReceiveItemProps {
  data: ReceiveItem[];
  isLoading: boolean;
  onEdit: (item: ReceiveItem) => void;
  onDelete: (item: ReceiveItem) => void;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
}
