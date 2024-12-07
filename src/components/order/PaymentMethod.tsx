import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import QRCode from '@/assets/images/qr-code.png';

interface PaymentMethodProps {
  subtotal: number;
}

export const PaymentMethod = ({ subtotal }: PaymentMethodProps) => {
  const [method, setMethod] = useState<'cash' | 'qris' | 'transfer'>('cash');
  const [cashAmount, setCashAmount] = useState<string>('');

  const handleMethodChange = (value: 'cash' | 'qris' | 'transfer') => {
    setMethod(value);
    setCashAmount('');
  };

  const calculateChange = () => {
    const amount = parseFloat(cashAmount) || 0;
    return amount - subtotal;
  };

  return (
    <div className="flex flex-col gap-6 h-[700px]">
      <div className="flex flex-col gap-2">
        <Label>Payment Method</Label>
        <Select
          value={method}
          onValueChange={(value: 'cash' | 'qris' | 'transfer') =>
            handleMethodChange(value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="qris">QRIS</SelectItem>
            <SelectItem value="transfer">Transfer Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {method === 'cash' && (
        <div className="flex flex-col gap-4">
          <div>
            <Label>Cash Amount</Label>
            <Input
              type="number"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              placeholder="Enter cash amount"
              className="text-lg"
            />
          </div>
          {cashAmount && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Cash:</span>
                <span className="font-bold">
                  ${parseFloat(cashAmount || '0').toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Change:</span>
                <span className="font-bold">
                  ${calculateChange().toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {method === 'qris' && (
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-center text-[20px] leading-[30px] font-bold">
            Scan QRIS Bellow
          </h3>
          <img src={QRCode} alt="QRIS Code" className="w-full max-w-[500px]" />
          <span className="text-center text-[20px] leading-[30px] font-medium">
            Blankpoint Shop
          </span>
        </div>
      )}

      {method === 'transfer' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-center text-[20px] leading-[30px] font-bold">
              Transfer to Bank Bellow
            </h3>
            <h4 className="text-center text-[24px] leading-[36px] font-bold">
              BRI 12345 6789 10231
            </h4>
            <span className="text-center text-[20px] leading-[30px] font-medium">
              Blankpoint Shop
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
