import { ColumnDef } from '@tanstack/react-table';
import { MasterItem } from '@/types/master-item';
import {
  BrandHeader,
  CapitalPriceHeader,
  CategoryHeader,
  IdHeader,
  ItemNameHeader,
  StockHeader,
} from '@/components/master-item/TableHeader';
import { RowAction } from '@/components/ui/RowAction';

export const TableColumns = (
  onEdit: (masterItem: MasterItem) => void,
  onDelete: (masterItem: MasterItem) => void,
  onView: (masterItem: MasterItem) => void,
  onCategoryFilter: (categories: string[]) => void,
  onBrandFilter: (brands: string[]) => void
): ColumnDef<MasterItem>[] => [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <IdHeader />,
    cell: ({ getValue }) => (
      <span className="min-w-[164px] flex-shrink-0 text-left">
        {getValue() as string}
      </span>
    ),
  },
  {
    id: 'itemName',
    accessorKey: 'itemName',
    header: ({ column }) => <ItemNameHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-[400px] flex-shrink-0 ">
        {getValue() as string}
      </span>
    ),
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }) => (
      <CategoryHeader column={column} onCategoryFilter={onCategoryFilter} />
    ),
    cell: ({ getValue, row }) => (
      <span className="min-w-80 flex-shrink-0 ">
        <span
          className={`${
            row.index % 2 === 0 ? 'bg-[#475569]' : 'bg-[#64748B]'
          } text-[#F8FAFC] rounded-[12px] px-4 h-6 flex items-center justify-center w-max`}
        >
          {getValue() as string}
        </span>
      </span>
    ),
    filterFn: (row, id, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(id));
    },
  },

  {
    id: 'brand',
    accessorKey: 'brand',
    header: ({ column }) => (
      <BrandHeader column={column} onBrandFilter={onBrandFilter} />
    ),
    cell: ({ getValue, row }) => (
      <span className="min-w-80 flex-shrink-0 ">
        <span
          className={`${
            row.index % 2 === 0 ? 'bg-[#475569]' : 'bg-[#64748B]'
          } text-[#F8FAFC] rounded-[12px] px-4 h-6 flex items-center justify-center w-max`}
        >
          {getValue() as string}
        </span>
      </span>
    ),
    filterFn: (row, id, filterValue: string[]) => {
      if (!filterValue?.length) return true;
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    id: 'capitalPrice',
    accessorKey: 'capitalPrice',
    header: ({ column }) => <CapitalPriceHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-48 flex-shrink-0 ">$ {getValue() as string}</span>
    ),
  },
  {
    id: 'stock',
    accessorKey: 'stock',
    header: ({ column }) => <StockHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-48 flex-shrink-0 flex items-center justify-end gap-3">
        {getValue() as string} <span>Pcs</span>
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
          onView={() => onView(row.original)}
        />
      </div>
    ),
  },
];
