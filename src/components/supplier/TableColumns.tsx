import { SupplierType } from '@/types/supplier';
import { ColumnDef } from '@tanstack/react-table';
import { RowAction } from '@/components/ui/RowAction';
import {
  AddressHeader,
  ContactHeader,
  SupplierNameHeader,
} from '@/components/supplier/TableHeader';

export const tableColumns = (
  onEdit: (user: SupplierType) => void,
  onDelete: (user: SupplierType) => void
): ColumnDef<SupplierType>[] => [
  {
    id: 'supplierName',
    accessorKey: 'supplierName',
    header: ({ column }) => <SupplierNameHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-80 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'contact',
    accessorKey: 'contact',
    header: ({ column }) => <ContactHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-80 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: ({ column }) => <AddressHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-[500px] flex-shrink-0">
        {getValue() as string}
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
  },
];
