import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getMonthName } from '@/utils/chart';

interface MonthSelectorProps {
  months: number[];
  selectedMonth: number;
  onMonthChange: (month: number) => void;
}

export const MonthSelector = ({
  months,
  selectedMonth,
  onMonthChange,
}: MonthSelectorProps) => (
  <Select
    value={selectedMonth.toString()}
    onValueChange={(value) => onMonthChange(parseInt(value))}
  >
    <SelectTrigger className="w-[120px] focus:outline-none focus:ring-0 focus:ring-offset-0">
      <SelectValue placeholder="Month" />
    </SelectTrigger>
    <SelectContent>
      {months.map((month) => (
        <SelectItem key={month} value={month.toString()}>
          {getMonthName(month)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
