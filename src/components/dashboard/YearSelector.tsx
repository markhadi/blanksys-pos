import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface YearSelectorProps {
  years: number[];
  selectedYear: string;
  onYearChange: (year: string) => void;
  disabled?: boolean;
}

export const YearSelector = ({
  years,
  selectedYear,
  onYearChange,
  disabled = false,
}: YearSelectorProps) => (
  <Select value={selectedYear} onValueChange={onYearChange} disabled={disabled}>
    <SelectTrigger className="min-w-max w-full lg:w-[180px] focus:outline-none focus:ring-0 focus:ring-offset-0">
      <SelectValue placeholder="Select year" />
    </SelectTrigger>
    <SelectContent>
      {years.map((year) => (
        <SelectItem key={year} value={year.toString()}>
          {year}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
