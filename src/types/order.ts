import { CartItem } from '@/contexts/CartContext';

export interface CustomerFormData {
  customerName: string;
  note: string;
}

export interface OrderHistory {
  id: string;
  customerName: string;
  transactionId: string;
  total: number;
  items: CartItem[];
  timestamp: string;
  note?: string;
}
