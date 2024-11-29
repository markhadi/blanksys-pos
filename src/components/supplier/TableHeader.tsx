import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { SupplierType } from '@/types/supplier';

export const SupplierNameHeader = ({
  column,
}: {
  column: Column<SupplierType>;
}) => (
  <button
    className="min-w-80 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>SUPPLIER NAME</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const ContactHeader = ({ column }: { column: Column<SupplierType> }) => (
  <button
    className="min-w-80 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>CONTACT</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const AddressHeader = ({ column }: { column: Column<SupplierType> }) => (
  <button
    className="min-w-[500px] flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>ADDRESS</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);
