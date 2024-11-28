import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { UserType } from '@/types/user';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface RoleFilterProps {
  column: Column<UserType>;
}

const ROLES = ['Administrator', 'Cashier'];

export const RoleFilterPopover = ({ column }: RoleFilterProps) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [tempSelectedRoles, setTempSelectedRoles] = useState<string[]>([]);
  const [tempSortDir, setTempSortDir] = useState<boolean | undefined>(
    undefined
  );

  const filteredRoles = ROLES.filter((role) =>
    role.toLowerCase().includes(search.toLowerCase())
  );

  const selectedRoles = (column.getFilterValue() as string[]) || [];

  const currentSortDir = column.getIsSorted();
  const isSortedDesc = currentSortDir === 'desc';
  const isSortedAsc = currentSortDir === 'asc';

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setTempSelectedRoles(selectedRoles);
      setTempSortDir(undefined);
      if (isSortedAsc) {
        setTempSortDir(false);
      } else if (isSortedDesc) {
        setTempSortDir(true);
      }
    }
    setOpen(isOpen);
  };

  const handleRoleToggle = (role: string) => {
    setTempSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSelectAll = () => {
    setTempSelectedRoles(filteredRoles);
  };

  const handleClear = () => {
    setTempSelectedRoles([]);
  };

  const handleSet = () => {
    if (tempSortDir !== undefined) {
      column.toggleSorting(tempSortDir);
    }
    column.setFilterValue(
      tempSelectedRoles.length ? tempSelectedRoles : undefined
    );
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2">
          <span>ROLE</span>
          <Button variant="ghost" className="flex items-center gap-2">
            <Icon icon="solar:filter-linear" className="w-4 h-4" />
            {selectedRoles.length > 0 && (
              <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {selectedRoles.length}
              </span>
            )}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-4">
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
              <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
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
              <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
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
            <div className="space-y-2">
              {filteredRoles.map((role) => (
                <div key={role} className="flex items-center gap-2">
                  <Checkbox
                    id={role}
                    checked={tempSelectedRoles.includes(role)}
                    onCheckedChange={() => handleRoleToggle(role)}
                    className="rounded-full"
                  />
                  <label htmlFor={role} className="text-sm">
                    {role}
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
