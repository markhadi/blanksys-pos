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

export interface OrderActionsProps {
  total: number;
  onClear: () => void;
  onPrint: () => void;
  onSave: () => void;
  onCheckout: () => void;
  isSubmitting?: boolean;
  isEditing?: boolean;
  itemCount: number;
}

export interface OrderItem {
  orderId?: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  cutPrice: number;
  tax: number;
  total: number;
}

export interface OrderDetailProps {
  orderId: string;
  customerName: string;
  note: string;
  items: OrderItem[];
  summary: OrderSummary;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPrint: () => void;
  onComplete: () => void;
}
