import { useVirtualizer } from '@tanstack/react-virtual';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { Transaction } from '@/types/dashboard';
import { TableCard } from '@/components/dashboard/TableCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { useMemo, useRef, useState, useEffect } from 'react';
import { transactionService } from '@/services/transaction.service';

const ROW_HEIGHT = 48;

export const TableLatestTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await transactionService.getLatestTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: () => (
          <span className="w-[110px] flex-shrink-0">Transaction ID</span>
        ),
        cell: ({ getValue }) => (
          <span className="w-[110px] flex-shrink-0">
            {getValue() as string}
          </span>
        ),
      },
      {
        id: 'timestamp',
        accessorKey: 'timestamp',
        header: () => (
          <span className="min-w-[200px] max-w-[300px] flex-grow">
            Timestamp
          </span>
        ),
        cell: ({ getValue }) => (
          <span className="min-w-[200px] max-w-[300px] flex-grow">
            {getValue() as string}
          </span>
        ),
      },
      {
        id: 'amount',
        accessorKey: 'amount',
        header: () => (
          <span className="min-w-[90px] flex-shrink-0">Amount</span>
        ),
        cell: ({ getValue }) => (
          <span className="min-w-[90px] flex-shrink-0">
            {getValue() as string}
          </span>
        ),
      },
      {
        id: 'status',
        accessorKey: 'status',
        header: () => (
          <span className="w-[88px] flex-shrink-0 flex-grow text-center">
            Status
          </span>
        ),
        cell: ({ getValue }) => (
          <StatusBadge status={getValue() as Transaction['status']} />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: transactions,
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
    <TableCard title="Latest Transaction">
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
                    className={`${
                      header.column.id === 'amount'
                        ? 'flex-grow flex-shrink-0 min-w-[90px]'
                        : header.column.id === 'status'
                        ? 'flex text-center'
                        : 'flex'
                    }`}
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
                      className={`${
                        cell.column.id === 'amount'
                          ? 'flex-grow flex-shrink-0 min-w-[90px]'
                          : cell.column.id === 'status'
                          ? 'flex text-center'
                          : 'flex'
                      }`}
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
