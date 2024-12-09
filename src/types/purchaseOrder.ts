import { OnChangeFn, SortingState } from '@tanstack/react-table';

export type PurchaseOrderStatus = 'Complete' | 'Partial';

export interface PurchaseOrderItem {
  id_item: string;
  item_name: string;
  qty_order: number;
  price: number;
  total: number;
  qty_receive: number;
  status: 'Complete' | 'Partial';
}

export interface PurchaseOrder {
  id_po: string;
  date: string;
  created_by: string;
  status: PurchaseOrderStatus;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderTableRow {
  id_po: string;
  date: string;
  created_by: string;
  status: PurchaseOrderStatus;
  items: PurchaseOrderItem[];
}

export const toPurchaseOrderTableRow = (
  po: PurchaseOrder
): PurchaseOrderTableRow => ({
  id_po: po.id_po,
  date: po.date,
  created_by: po.created_by,
  status: po.status,
  items: po.items,
});

export interface PurchaseOrderSearchParams {
  search?: string;
  status?: PurchaseOrderStatus[];
  created_by?: string[];
  sorting?: {
    field: keyof PurchaseOrderTableRow;
    order: 'asc' | 'desc';
  };
}

export interface PurchaseOrderTableProps {
  data: PurchaseOrderTableRow[];
  isLoading: boolean;
  onEdit: (po: PurchaseOrderTableRow) => void;
  onDelete: (po: PurchaseOrderTableRow) => void;
  onView: (po: PurchaseOrderTableRow) => void;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  onStatusFilter: (statuses: string[]) => void;
  onCreatorFilter: (creators: string[]) => void;
}
