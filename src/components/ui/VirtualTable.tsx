import { ColumnDef, flexRender } from '@tanstack/react-table';
import { TableCard } from '@/components/dashboard/TableCard';
import { useVirtualTable } from '@/hooks/useVirtualTable';

interface VirtualTableProps<T> {
  title: string;
  data: T[];
  columns: ColumnDef<T, any>[];
}

export function VirtualTable<T>({
  title,
  data,
  columns,
}: VirtualTableProps<T>) {
  const { table, rows, rowVirtualizer, parentRef } = useVirtualTable(
    data,
    columns
  );

  return (
    <TableCard title={title}>
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
                      header.column.id === 'product' ||
                      header.column.id === 'amount'
                        ? 'flex flex-grow'
                        : 'flex'
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
                        cell.column.id === 'product' ||
                        cell.column.id === 'amount'
                          ? 'flex flex-grow'
                          : 'flex'
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
}
