import { useState } from 'react';
import { Button } from '../ui/button';
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
import { Icon } from '@iconify/react';

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

  const handleNumberClick = (value: string) => {
    if (value === 'del') {
      setCashAmount((prev) => prev.slice(0, -1));
    } else if (value === '.' && cashAmount.includes('.')) {
      return;
    } else {
      setCashAmount((prev) => prev + value);
    }
  };

  const numberPad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'del'],
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label className="text-[20px] leading-[30px] font-medium">
          Payment Method
        </Label>
        <Select
          value={method}
          onValueChange={(value: 'cash' | 'qris' | 'transfer') =>
            handleMethodChange(value)
          }
        >
          <SelectTrigger className="text-[20px] leading-[30px]">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash" className="text-[20px] leading-[30px]">
              Cash
            </SelectItem>
            <SelectItem value="qris" className="text-[20px] leading-[30px]">
              QRIS
            </SelectItem>
            <SelectItem value="transfer" className="text-[20px] leading-[30px]">
              Transfer Bank
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {method === 'cash' && (
        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-[20px] leading-[30px] font-medium">
              Cash Amount
            </Label>
            <Input
              type="text"
              value={cashAmount}
              readOnly
              className="!text-[20px] !leading-[30px] text-right"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {numberPad.map((row, rowIndex) =>
              row.map((num, colIndex) => (
                <Button
                  key={`${rowIndex}-${colIndex}`}
                  variant={num === 'del' ? 'destructive' : 'outline'}
                  className={`h-28 text-[38px] font-medium bg-[#F1F5F9] hover:bg-[#E2E8F0] ${
                    num === 'del'
                      ? 'text-[#EF4444] [&_svg]:size-9'
                      : 'text-black'
                  }`}
                  onClick={() => handleNumberClick(num)}
                >
                  {num === 'del' ? (
                    <Icon icon="solar:backspace-outline" />
                  ) : (
                    num
                  )}
                </Button>
              ))
            )}
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
