import { UnitType } from '@/types/unit';
import { ColumnDef } from '@tanstack/react-table';
import { TableConfig } from '@/components/unit/TableConfig';
import { QtyHeader, UnitNameHeader } from '@/components/unit/TableHeader';
import { RowAction } from '@/components/ui/RowAction';

export const createColumns = (
  onEdit: (unit: UnitType) => void,
  onDelete: (unit: UnitType) => void
): ColumnDef<UnitType>[] => [
  {
    id: 'unitName',
    accessorKey: 'unitName',
    header: ({ column }) => <UnitNameHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-[130px] flex-shrink-0 flex-grow">
        {getValue() as string}
      </span>
    ),
    minSize: TableConfig.MIN_COLUMN_WIDTH,
  },
  {
    id: 'qty',
    accessorKey: 'qty',
    header: ({ column }) => <QtyHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-[110px] flex-shrink-0 flex-grow">
        {getValue() as number}
      </span>
    ),
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
        />
      </div>
    ),
    size: TableConfig.ACTION_COLUMN_WIDTH,
  },
];
