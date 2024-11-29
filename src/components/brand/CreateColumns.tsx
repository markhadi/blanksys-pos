import { BrandType } from '@/types/brand';
import { ColumnDef } from '@tanstack/react-table';
import { BrandNameHeader } from '@/components/brand/BrandNameHeader';
import { RowAction } from '@/components/ui/RowAction';

export const createColumns = (
  onEdit: (brand: BrandType) => void,
  onDelete: (brand: BrandType) => void
): ColumnDef<BrandType>[] => [
  {
    id: 'brandName',
    accessorKey: 'brandName',
    header: ({ column }) => <BrandNameHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-[110px] flex-shrink-0 flex-grow">
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
