import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';
import QRCode from '@/assets/images/qr-code.png';

interface PaymentMethodProps {
  selectedMethod: 'cash' | 'qris' | 'transfer';
  onMethodChange: (method: 'cash' | 'qris' | 'transfer') => void;
  cashAmount: string;
  onCashAmountChange: (amount: string) => void;
}

export const PaymentMethod = ({
  selectedMethod,
  onMethodChange,
  cashAmount,
  onCashAmountChange,
}: PaymentMethodProps) => {
  const handleNumberClick = (value: string) => {
    if (value === 'del') {
      onCashAmountChange(cashAmount.slice(0, -1));
    } else if (value === '.' && cashAmount.includes('.')) {
      return;
    } else {
      onCashAmountChange(cashAmount + value);
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
        <Select value={selectedMethod} onValueChange={onMethodChange}>
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

      {selectedMethod === 'cash' && (
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
        </div>
      )}

      {selectedMethod === 'qris' && (
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-center text-[20px] leading-[30px] font-bold">
            Scan QRIS Below
          </h3>
          <img src={QRCode} alt="QRIS Code" className="w-full max-w-[500px]" />
          <span className="text-center text-[20px] leading-[30px] font-medium">
            Blankpoint Shop
          </span>
        </div>
      )}

      {selectedMethod === 'transfer' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-center text-[20px] leading-[30px] font-bold">
              Transfer to Bank Below
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
