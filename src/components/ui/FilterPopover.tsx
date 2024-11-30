import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { useState } from 'react';

interface FilterPopover<T> {
  column: Column<T>;
  title: string;
  options: string[];
  onFilter: (value: string[]) => void;
}

export const FilterPopover = <T,>({
  column,
  title,
  options,
  onFilter,
}: FilterPopover<T>) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [tempSelectedValues, setTempSelectedValues] = useState<string[]>([]);
  const [tempSortDir, setTempSortDir] = useState<boolean | undefined>(
    undefined
  );

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const selectedValues = (column.getFilterValue() as string[]) || [];
  const currentSortDir = column.getIsSorted();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setTempSelectedValues(selectedValues);
      setTempSortDir(undefined);
      if (currentSortDir === 'asc') {
        setTempSortDir(false);
      } else if (currentSortDir === 'desc') {
        setTempSortDir(true);
      }
    }
    setOpen(isOpen);
  };

  const handleValueToggle = (value: string) => {
    setTempSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSelectAll = () => {
    setTempSelectedValues(filteredOptions);
  };

  const handleClear = () => {
    setTempSelectedValues([]);
  };

  const handleSet = () => {
    if (tempSortDir !== undefined) {
      column.toggleSorting(tempSortDir);
    }
    onFilter(tempSelectedValues);
    column.setFilterValue(tempSelectedValues);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 justify-between w-full cursor-pointer">
          <span>{title}</span>
          <Button className="flex items-center gap-2 bg-transparent hover:bg-transparent text-[#0F172A] p-0">
            <Icon icon="solar:filter-linear" className="w-4 h-4" />
            {selectedValues.length > 0 && (
              <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {selectedValues.length}
              </span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full sm:w-96 p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Button
              onClick={() =>
                setTempSortDir((prev) => (prev === false ? undefined : false))
              }
              className={`text-[16px] leading-[1.5em] flex items-center justify-between gap-2 w-full p-0 bg-transparent hover:bg-transparent ${
                tempSortDir === false ? 'text-[#1E293B]' : 'text-[#94A3B8]'
              }  hover:text-[#1E293B] [&_svg]:w-max [&_svg]:h-max`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  icon="solar:sort-vertical-linear"
                  width={24}
                  height={24}
                />
                <span>Sort A to Z</span>
              </div>
              {tempSortDir === false && (
                <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
              )}
            </Button>

            <Button
              onClick={() =>
                setTempSortDir((prev) => (prev === true ? undefined : true))
              }
              className={`text-[16px] leading-[1.5em] flex items-center justify-between gap-2 w-full p-0 bg-transparent hover:bg-transparent ${
                tempSortDir === true ? 'text-[#1E293B]' : 'text-[#94A3B8]'
              }  hover:text-[#1E293B] [&_svg]:w-max [&_svg]:h-max`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  icon="solar:sort-vertical-linear"
                  width={24}
                  height={24}
                />
                <span>Sort Z to A</span>
              </div>
              {tempSortDir === true && (
                <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8"
            />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="flex-1"
              >
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                className="flex-1"
              >
                Clear
              </Button>
            </div>
            <div className="space-y-2 max-h-20 overflow-y-auto">
              {filteredOptions.map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <Checkbox
                    id={option}
                    checked={tempSelectedValues.includes(option)}
                    onCheckedChange={() => handleValueToggle(option)}
                    className="rounded-full"
                  />
                  <label htmlFor={option} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSet}
                className="flex-1"
              >
                Set
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
