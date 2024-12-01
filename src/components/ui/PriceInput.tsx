import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface PriceInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const PriceInput = ({
  label,
  value,
  onChange,
  disabled,
}: PriceInputProps) => (
  <FormItem>
    <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
      {label}
    </FormLabel>
    <div className="flex relative">
      <FormControl>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="h-14 pl-12 pr-4 py-3 rounded-[8px] border border-[#E2E8F0]"
        />
      </FormControl>
      <span className="absolute left-0 top-0 bg-[#64748B] text-white h-full w-11 flex items-center justify-center rounded-tl-[8px] rounded-bl-[8px]">
        $
      </span>
    </div>
    <FormMessage />
  </FormItem>
);
