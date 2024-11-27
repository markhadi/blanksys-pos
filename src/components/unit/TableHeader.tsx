import { UnitType } from '@/types/unit';
import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';

export const UnitNameHeader = ({ column }: { column: Column<UnitType> }) => (
  <button
    className="min-w-[130px] flex-shrink-0 flex items-center gap-2"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>UNIT NAME</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const QtyHeader = ({ column }: { column: Column<UnitType> }) => (
  <button
    className="min-w-[110px] flex-shrink-0 flex-grow flex items-center gap-2"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>QTY Number (Each)</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);
