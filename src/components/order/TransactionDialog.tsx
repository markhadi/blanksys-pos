import { Dialog, DialogContent, DialogTitle, DialogHeader } from '../ui/dialog';
import { OrderItemList, OrderSummarySection } from './OrderDetail';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummary {
  subtotal: number;
  discount: number;
  cutPrice: number;
  tax: number;
  total: number;
}

interface TransactionDialogProps {
  open: boolean;
  onClose: () => void;
  items: OrderItem[];
  summary: OrderSummary;
}

export const TransactionDialog = ({
  open,
  onClose,
  items,
  summary,
}: TransactionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="gap-10 w-full max-w-[1120px]">
        <DialogHeader>
          <DialogTitle className="text-[20px] leading-[30px] font-bold">
            Transaction
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <OrderItemList items={items} />
            <OrderSummarySection summary={summary} />
          </div>

          <div>transaction</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
