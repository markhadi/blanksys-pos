import { Category } from '@/types/category';
import { ColumnDef } from '@tanstack/react-table';
import { TableConfig } from '@/components/category/TableConfig';
import { CategoryNameHeader } from '@/components/category/CategoryNameHeader';
import { RowAction } from '@/components/ui/RowAction';

export const createColumns = (
  onEdit: (category: Category) => void,
  onDelete: (category: Category) => void
): ColumnDef<Category>[] => [
  {
    id: 'categoryName',
    accessorKey: 'categoryName',
    header: ({ column }) => <CategoryNameHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-[110px] flex-shrink-0 flex-grow">
        {getValue() as string}
      </span>
    ),
    minSize: TableConfig.MIN_COLUMN_WIDTH,
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
