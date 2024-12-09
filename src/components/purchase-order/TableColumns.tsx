import { ColumnDef } from '@tanstack/react-table';
import { PurchaseOrderTableRow } from '@/types/purchaseOrder';
import { RowAction } from '@/components/ui/RowAction';
import {
  DateHeader,
  IdHeader,
  CreatedByHeader,
  StatusHeader,
} from './TableHeader';

export const TableColumns = (
  onEdit: (po: PurchaseOrderTableRow) => void,
  onDelete: (po: PurchaseOrderTableRow) => void,
  onView: (po: PurchaseOrderTableRow) => void,
  onStatusFilter: (statuses: string[]) => void,
  onCreatorFilter: (creators: string[]) => void
): ColumnDef<PurchaseOrderTableRow>[] => [
  {
    id: 'id_po',
    accessorKey: 'id_po',
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
    id: 'created_by',
    accessorKey: 'created_by',
    header: ({ column }) => (
      <CreatedByHeader column={column} onCreatorFilter={onCreatorFilter} />
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
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <StatusHeader column={column} onStatusFilter={onStatusFilter} />
    ),
    cell: ({ getValue, row }) => {
      const status = getValue() as string;
      const items = row.original.items || [];
      const totalItems = items.length;
      const completedItems = items.filter(
        (item) => item.status === 'Complete'
      ).length;
      const progressPercentage = (completedItems / totalItems) * 100;

      return (
        <span className="min-w-56 flex-shrink-0">
          {status === 'Complete' ? (
            <span className="bg-[#22C55E]/15 text-[#22C55E] rounded-[12px] py-4 h-8 flex items-center justify-center w-40 font-medium text-[16px]">
              Complete
            </span>
          ) : (
            <div className="w-40">
              <div className="w-full bg-[#E2E8F0] rounded-[12px] py-4 h-8 relative grid place-content-center">
                <span className="text-[#475569] text-[16px] font-medium z-10">
                  {`${completedItems}/${totalItems}`}
                </span>
                <div
                  className="bg-[#CBD5E1] rounded-[12px] h-8 absolute left-0 top-0 z-0"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </span>
      );
    },
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
