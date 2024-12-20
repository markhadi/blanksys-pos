import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';
import { TableCard } from '@/components/ui/TableCard';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { EmptyState } from '@/components/ui/TableEmptyState';
import { SupplierTableProps } from '@/types/supplier';
import { TableColumns } from '@/components/supplier/TableColumns';
import { TableConfig } from '@/config/Table';

export const TableSupplier = ({
  data,
  isLoading,
  onEdit,
  onDelete,
  sorting = [],
  onSortingChange,
}: SupplierTableProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const columns = useMemo(
    () => TableColumns(onEdit, onDelete),
    [onEdit, onDelete]
  );

  const validData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const table = useReactTable({
    data: validData,
    columns,
    state: {
      sorting: sorting || [],
    },
    onSortingChange: onSortingChange as OnChangeFn<SortingState>,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => TableConfig.ROW_HEIGHT,
    overscan: TableConfig.OVERSCAN,
  });

  return (
    <TableCard>
      <div
        className="overflow-auto relative rounded-lg"
        ref={parentRef}
        style={{ height: TableConfig.HEIGHT }}
      >
        <div className="w-full min-w-max bg-white text-left text-slate-700">
          <div className="font-bold font-inter text-[16px] tracking-[-0.01em] leading-[1.5em] text-[#0F172A] border-b border-[#CBD5E1] z-10 sticky top-0 w-full bg-white h-[54px]">
            <div className="w-full min-w-96 min-h-12 text-left flex gap-5 items-center">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <div
                    key={header.id}
                    className={
                      header.column.id === 'address'
                        ? 'flex flex-grow flex-shrink-0'
                        : header.column.id === 'supplierName' ||
                          header.column.id === 'contact'
                        ? 'flex flex-shrink-0'
                        : 'flex text-center'
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

          {isLoading ? (
            <TableSkeleton rows={8} rowHeight={TableConfig.ROW_HEIGHT} />
          ) : rows.length === 0 ? (
            <EmptyState
              title="No Supplier Found"
              description="Try adding a new supplier or adjusting your search."
            />
          ) : (
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
                    className={`absolute w-full flex gap-5 h-max items-center font-normal font-inter text-[16px] tracking-[-0.01em] leading-[1.5em] text-[#1E293B] ${
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
                          cell.column.id === 'address'
                            ? 'flex flex-grow flex-shrink-0'
                            : cell.column.id === 'supplierName' ||
                              cell.column.id === 'contact'
                            ? 'flex flex-shrink-0'
                            : 'flex text-center'
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
          )}
        </div>
      </div>
    </TableCard>
  );
};
