import { CartItem } from '@/contexts/CartContext';

export interface CustomerFormData {
  customerName: string;
  note: string;
}

export interface OrderHistory {
  id: string;
  customerName: string;
  transactionId: string;
  items: CartItem[];
  timestamp: string;
  note?: string;
  subtotal: number;
  discount: number;
  cutPrice: number;
  tax: number;
  total: number;
}
