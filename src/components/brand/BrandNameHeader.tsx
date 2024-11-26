import { BrandType } from '@/types/brand';
import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';

export const BrandNameHeader = ({ column }: { column: Column<BrandType> }) => (
  <button
    className="min-w-[110px] flex-shrink-0 flex-grow flex items-center gap-2"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>BRAND NAME</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);
