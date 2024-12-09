import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSupplier } from '@/hooks/supplier/useSupplier';
import { Icon } from '@iconify/react';
import { CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { SupplierType } from '@/types/supplier';

const ActionsHeader = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
      <div className="flex items-center gap-2 text-[#0F172A]">
        <button
          role="button"
          onClick={() => navigate(-1)}
          className="flex items-center"
        >
          <Icon height={24} width={24} icon="icon-park-outline:left" />
        </button>
        <h2 className="font-bold text-[20px]">Create Purchase Order</h2>
      </div>
      <Button className="w-full sm:w-auto" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

interface PurchaseOrderHeaderProps {
  onSupplierChange: (supplierId: string) => void;
  onDateChange: (date: Date) => void;
  subtotal: number;
}

const generatePONumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `PO-${year}${month}${random}`;
};

const PurchaseOrderHeader = ({
  onSupplierChange,
  onDateChange,
  subtotal,
}: PurchaseOrderHeaderProps) => {
  const [date, setDate] = useState<Date>();
  const { data: suppliers = [] } = useSupplier({});
  const poNumber = generatePONumber();

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) onDateChange(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-7">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-7 w-full">
        <div className="flex gap-2 items-center w-full xl:w-auto">
          <label className="font-medium text-black min-w-28 lg:min-w-max">
            ID
          </label>
          <Input
            value={poNumber}
            disabled
            className="bg-[#F1F5F9] w-full xl:max-w-36 !text-[16px] text-[#1E293B] px-4 py-3"
          />
        </div>

        <div className="flex gap-2 items-center w-full xl:w-auto">
          <label className="font-medium text-black min-w-28 lg:min-w-max">
            Supplier
          </label>
          <Select onValueChange={(value) => onSupplierChange(value)}>
            <SelectTrigger className="text-[16px] px-4 py-3 w-full xl:w-auto">
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier: SupplierType) => (
                <SelectItem
                  key={supplier.id}
                  value={supplier.id.toString()}
                  className="text-[16px] w-max"
                >
                  {supplier.supplierName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center w-full xl:w-auto">
          <label className="font-medium text-black min-w-28 lg:min-w-max">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-between gap-2 xl:justify-start text-left font-normal text-[16px] px-4 py-3 xl:w-auto',
                  !date && 'text-muted-foreground'
                )}
              >
                {date ? format(date, 'MM/dd/yyyy') : <span>Pick a date</span>}
                <CalendarIcon className="mr-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-2 items-center w-full xl:w-auto">
        <label className="font-bold uppercase text-black text-[18px] min-w-28 lg:min-w-max">
          Subtotal
        </label>
        <Input
          value={subtotal.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          disabled
          className="bg-[#F1F5F9] text-right !text-[#1E293B] !text-[18px] px-4 py-3 w-full xl:w-auto"
        />
      </div>
    </div>
  );
};

export const CreatePurchaseOrder = () => {
  return (
    <div className="flex flex-col gap-5">
      <ActionsHeader />
      <PurchaseOrderHeader
        onSupplierChange={() => {}}
        onDateChange={() => {}}
        subtotal={0}
      />
    </div>
  );
};
