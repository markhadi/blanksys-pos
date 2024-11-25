import { Category } from '@/types/category';
import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';

export const CategoryNameHeader = ({
  column,
}: {
  column: Column<Category>;
}) => (
  <button
    className="min-w-[110px] flex-shrink-0 flex-grow flex items-center gap-2"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>CATEGORY NAME</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);
