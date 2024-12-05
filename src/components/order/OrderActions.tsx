import { Printer, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderActionsProps {
  total: number;
  onClear: () => void;
  onPrint: () => void;
  onSave: () => void;
  onCheckout: () => void;
  isSubmitting?: boolean;
  itemCount: number;
}

export const OrderActions = ({
  total,
  onClear,
  onPrint,
  onSave,
  onCheckout,
  isSubmitting,
  itemCount,
}: OrderActionsProps) => (
  <>
    <div className="flex items-center justify-end gap-6">
      <span className="text-[20px] font-poppins">Total:</span>
      <span className="text-[36px] font-poppins font-bold">
        $ {total.toLocaleString()}
      </span>
    </div>
    <div className="flex items-center justify-end gap-4 flex-wrap lg:flex-nowrap">
      <Button
        variant="outline"
        className="w-full font-inter text-[20px] h-max lg:h-14 font-medium"
        onClick={onClear}
        type="reset"
        disabled={itemCount === 0}
      >
        <Trash2 className="mr-2" />
        Clear
      </Button>
      <Button
        variant="outline"
        className="w-full font-inter text-[20px] h-max lg:h-14 font-medium"
        onClick={onPrint}
        type="button"
        disabled={itemCount === 0}
      >
        <Printer className="mr-2" />
        Print
      </Button>
      <Button
        variant="outline"
        className="w-full font-inter text-[20px] h-max lg:h-14 font-medium"
        onClick={onSave}
        type="button"
        disabled={itemCount === 0}
      >
        <Save className="mr-2" />
        Save
      </Button>
      <Button
        className="w-full font-inter text-[20px] h-max lg:h-14 font-bold"
        onClick={onCheckout}
        type="submit"
        disabled={isSubmitting || itemCount === 0}
      >
        Checkout
      </Button>
    </div>
  </>
);
