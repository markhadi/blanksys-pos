import { ColumnDef } from '@tanstack/react-table';
import { ReceiveTableRow } from '@/types/receive';
import { RowAction } from '@/components/ui/RowAction';
import {
  DateHeader,
  IdHeader,
  ReceiverHeader,
  SupplierHeader,
} from '@/components/receive/TableHeader';

export const TableColumns = (
  onEdit: (receive: ReceiveTableRow) => void,
  onDelete: (receive: ReceiveTableRow) => void,
  onView: (receive: ReceiveTableRow) => void,
  onReceiverFilter: (receivers: string[]) => void,
  onSupplierFilter: (suppliers: string[]) => void
): ColumnDef<ReceiveTableRow>[] => [
  {
    id: 'id_receive',
    accessorKey: 'id_receive',
    header: () => <IdHeader />,
    cell: ({ getValue }) => (
      <span className="min-w-60 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: ({ column }) => <DateHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-64 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'supplier_name',
    accessorKey: 'supplier_name',
    header: ({ column }) => (
      <SupplierHeader column={column} onSupplierFilter={onSupplierFilter} />
    ),
    cell: ({ getValue }) => (
      <span className="min-w-64 flex-grow flex-shrink-0">
        {getValue() as string}
      </span>
    ),
    filterFn: (row, id, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    id: 'receive_by',
    accessorKey: 'receive_by',
    header: ({ column }) => (
      <ReceiverHeader column={column} onReceiverFilter={onReceiverFilter} />
    ),
    cell: ({ getValue }) => (
      <span className="min-w-64 flex-grow flex-shrink-0">
        {getValue() as string}
      </span>
    ),
    filterFn: (row, id, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    id: 'action',
    accessorKey: 'action',
    header: () => <span className="w-[77px]">ACTION</span>,
    cell: ({ row }) => (
      <div className="w-[77px] flex justify-center">
        <RowAction
          onEdit={() => onEdit(row.original)}
          onDelete={() => onDelete(row.original)}
          onView={() => onView(row.original)}
        />
      </div>
    ),
  },
];
