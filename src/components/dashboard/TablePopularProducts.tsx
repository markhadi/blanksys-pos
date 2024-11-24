import { useVirtualizer } from '@tanstack/react-virtual';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { PopularProduct } from '@/types/dashboard';
import { TableCard } from '@/components/dashboard/TableCard';
import { useMemo, useRef, useState, useEffect } from 'react';
import { productService } from '@/services/product.service';

const ROW_HEIGHT = 48;

export const TablePopularProducts = () => {
  const [products, setProducts] = useState<PopularProduct[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getPopularProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const columns = useMemo<ColumnDef<PopularProduct>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: () => (
          <span className="w-[89px] flex-shrink-0">Product ID</span>
        ),
        cell: ({ getValue }) => (
          <span className="w-[89px] flex-shrink-0">{getValue() as string}</span>
        ),
      },
      {
        id: 'product',
        accessorKey: 'name',
        header: () => <span className="flex-grow min-w-[200px]">Product</span>,
        cell: ({ row }) => (
          <span className="flex-grow min-w-[200px] flex gap-[10px] items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-7 h-7 rounded-[4px] object-cover"
            />
            <span className="flex flex-col items-start justify-center">
              <span>{row.original.name}</span>
            </span>
          </span>
        ),
      },
      {
        id: 'stock',
        accessorKey: 'stock',
        header: () => <span className="w-[120px] text-right">Stock</span>,
        cell: ({ row }) => (
          <span className="w-[120px] flex gap-[10px] items-center justify-end">
            <span>{row.original.stock}</span>
            <span className="text-[#94A3B8]">{row.original.unit}</span>
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 5,
  });

  return (
    <TableCard title="Popular Products">
      <div
        className="overflow-auto relative rounded-lg"
        ref={parentRef}
        style={{ height: '240px' }}
      >
        <div className="w-full min-w-max bg-white text-left text-slate-700">
          <div className="font-bold text-[14px] leading-[19px] text-[#000000] border-b border-[#CBD5E1] z-10 sticky top-0 w-full bg-white">
            <div className="w-full min-h-12 text-left flex gap-5 items-center">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <div
                    key={header.id}
                    className={
                      header.column.id === 'product' ? 'flex flex-grow' : 'flex'
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <div
                  key={row.id}
                  className={`absolute w-full flex gap-5 h-max items-center text-[14px] leading-[19px] ${
                    row.index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                  }`}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div
                      key={cell.id}
                      className={
                        cell.column.id === 'product' ? 'flex flex-grow' : 'flex'
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TableCard>
  );
};
