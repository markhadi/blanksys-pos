import { ColumnDef } from '@tanstack/react-table';
import { IssuedTableRow } from '@/types/issued';
import { RowAction } from '@/components/ui/RowAction';
import {
  DateHeader,
  IdHeader,
  IssuedByHeader,
} from '@/components/issued/TableHeader';
import { formatDate } from '@/utils/formatters';

export const TableColumns = (
  onEdit: (issued: IssuedTableRow) => void,
  onDelete: (issued: IssuedTableRow) => void,
  onView: (issued: IssuedTableRow) => void,
  onIssuedByFilter: (issuers: string[]) => void
): ColumnDef<IssuedTableRow>[] => [
  {
    id: 'id',
    accessorKey: 'id',
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
      <span className="min-w-64 flex-shrink-0">
        {formatDate(getValue() as string)}
      </span>
    ),
  },
  {
    id: 'issuedBy',
    accessorKey: 'issuedBy',
    header: ({ column }) => (
      <IssuedByHeader column={column} onIssuedByFilter={onIssuedByFilter} />
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
