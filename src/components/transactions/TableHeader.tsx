import { TransactionType } from '@/types/transaction';
import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { FilterPopover } from '@/components/ui/FilterPopover';

export const TransactionIdHeader = () => (
  <button className="min-w-40 flex-shrink-0 flex items-center gap-2 justify-between w-full">
    <span>TRANSACTION ID</span>
  </button>
);

export const TimestampHeader = ({
  column,
}: {
  column: Column<TransactionType>;
}) => (
  <button
    className="min-w-56 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => column.toggleSorting()}
  >
    <span>TIMESTAMP</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const StatusHeader = ({
  column,
  onStatusFilter,
}: {
  column: Column<TransactionType>;
  onStatusFilter: (status: string[]) => void;
}) => {
  const statuses = ['Complete', 'Refund', 'Canceled'];

  return (
    <div className="min-w-96 flex-shrink-0 flex items-center gap-2">
      <FilterPopover
        title="STATUS"
        column={column}
        options={statuses}
        onFilter={onStatusFilter}
      />
    </div>
  );
};

export const QtyHeader = ({ column }: { column: Column<TransactionType> }) => (
  <button
    className="min-w-32 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => column.toggleSorting()}
  >
    <span>QTY</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const TransactionHeader = ({
  column,
}: {
  column: Column<TransactionType>;
}) => (
  <button
    className="min-w-96 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => column.toggleSorting()}
  >
    <span>TRANSACTION</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);
