import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { SelectFieldProps } from '@/types/master-item';

export const SelectField = ({
  label,
  placeholder,
  searchPlaceholder,
  options,
  value,
  onChange,
  onAddNew,
  addNewLabel,
  disabled,
}: SelectFieldProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FormItem className="flex-1">
      <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
        {label}
      </FormLabel>
      <div className="flex gap-2">
        <Select
          value={String(value || '')}
          onValueChange={(value) => {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
              onChange(numValue);
            }
          }}
          disabled={disabled}
        >
          <FormControl>
            <SelectTrigger className="h-14 px-4 py-3">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <div className="sticky top-0 bg-white z-10">
              <div className="p-2">
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchTerm(e.target.value);
                  }}
                  className="h-9"
                />
              </div>
              <Button
                type="button"
                className="w-full font-medium text-[#94A3B8] bg-transparent hover:bg-gray-100 items-center gap-2 justify-start"
                onClick={onAddNew}
              >
                <Icon icon="solar:add-circle-outline" />
                <span>{addNewLabel}</span>
              </Button>
            </div>

            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No {label.toLowerCase()} found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
    </FormItem>
  );
};
