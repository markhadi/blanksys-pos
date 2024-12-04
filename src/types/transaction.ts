export interface TransactionType {
  id_transaction: string;
  timestamp: string;
  qty: number;
  unit: string;
  transaction: number;
  notes: string;
  status: 'Complete' | 'Refund' | 'Canceled';
}

export interface TransactionSearchParams {
  search?: string;
  sorting?: {
    field: keyof TransactionType;
    order: 'asc' | 'desc';
  };
  status?: string[];
}
