import { TransactionType } from '@/types/transaction';
import { ColumnDef } from '@tanstack/react-table';
import {
  QtyHeader,
  StatusHeader,
  TimestampHeader,
  TransactionHeader,
  TransactionIdHeader,
} from './TableHeader';

export const TableColumns = (
  onStatusFilter: (status: string[]) => void
): ColumnDef<TransactionType>[] => [
  {
    id: 'id_transaction',
    accessorKey: 'id_transaction',
    header: () => <TransactionIdHeader />,
    cell: ({ getValue }) => (
      <span className="min-w-40 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'timestamp',
    accessorKey: 'timestamp',
    header: ({ column }) => <TimestampHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-56 flex-shrink-0">
        {new Date(getValue() as string).toLocaleString()}
      </span>
    ),
  },
  {
    id: 'qty',
    accessorKey: 'qty',
    header: ({ column }) => <QtyHeader column={column} />,
    cell: ({ getValue, row }) => (
      <span className="min-w-32 flex-shrink-0 flex items-center justify-end gap-3">
        {getValue() as number}
        <span className="text-sm text-gray-500">{row.original.unit}</span>
      </span>
    ),
  },

  {
    id: 'transaction',
    accessorKey: 'transaction',
    header: ({ column }) => <TransactionHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-96 flex-shrink-0">
        ${(getValue() as number).toFixed(2)}
      </span>
    ),
  },
  {
    id: 'notes',
    accessorKey: 'notes',
    header: () => <span className="min-w-96 flex-shrink-0">NOTE</span>,
    cell: ({ getValue }) => (
      <span className="min-w-96 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <StatusHeader column={column} onStatusFilter={onStatusFilter} />
    ),
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const colorMap = {
        Complete: 'text-[#22C55E]',
        Refund: 'text-[#3B82F6]',
        Canceled: 'text-[#EF4444]',
      };
      return (
        <span
          className={`min-w-96 flex-shrink-0 ${
            colorMap[status as keyof typeof colorMap]
          }`}
        >
          {status}
        </span>
      );
    },
    filterFn: (row, id, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(id));
    },
  },
];
