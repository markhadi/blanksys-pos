import { Dialog, DialogContent, DialogTitle, DialogHeader } from '../ui/dialog';
import { OrderItemList, OrderSummarySection } from './OrderDetail';
import { PaymentMethod } from './PaymentMethod';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';
import { useState } from 'react';

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
  const [isComplete, setIsComplete] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    'cash' | 'qris' | 'transfer'
  >('cash');
  const [cashAmount, setCashAmount] = useState<string>('');

  const handleMethodChange = (method: 'cash' | 'qris' | 'transfer') => {
    setSelectedMethod(method);
    setCashAmount('');
  };

  const handleCashAmountChange = (amount: string) => {
    setCashAmount(amount);
  };

  const calculateChange = () => {
    const amount = parseFloat(cashAmount) || 0;
    return amount - summary.total;
  };

  const handleSubmit = () => {
    setIsComplete(true);
  };

  const handleClose = () => {
    setIsComplete(false);
    setSelectedMethod('cash');
    setCashAmount('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="gap-10 w-full max-w-[1120px]">
        {!isComplete ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-[20px] leading-[30px] font-bold">
                Transaction
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col justify-between gap-6 h-full">
                <div>
                  <OrderItemList items={items} className="!max-h-80" />
                  <OrderSummarySection summary={summary} />
                </div>
                <Button
                  variant="outline"
                  className="w-full text-[20px] py-6"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <PaymentMethod
                  selectedMethod={selectedMethod}
                  onMethodChange={handleMethodChange}
                  cashAmount={cashAmount}
                  onCashAmountChange={handleCashAmountChange}
                />

                <Button
                  className="w-full text-[20px] py-6 font-bold"
                  onClick={handleSubmit}
                  disabled={
                    selectedMethod === 'cash' &&
                    (!cashAmount || parseFloat(cashAmount) < summary.subtotal)
                  }
                >
                  Submit Payment
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-between h-full gap-10">
            <div className="flex flex-col w-full gap-5">
              <div className="flex items-center justify-center">
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  className="size-[124px] text-green-500"
                />
              </div>

              <div className="flex flex-col items-center gap-5">
                <h2 className="text-[24px] leading-[36px]">
                  Transaction Complete
                </h2>
                <p className="text-[20px] leading-[30px] text-gray-500">
                  Payment received via {selectedMethod.toUpperCase()}
                </p>
                {selectedMethod === 'cash' && calculateChange() > 0 && (
                  <p className="text-[24px] leading-[36px]">
                    Change: <br />{' '}
                    <span className="text-[30px] leading-[45px] font-bold">
                      ${calculateChange().toFixed(2)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <Button onClick={handleClose} className="w-full text-[20px] py-6">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
