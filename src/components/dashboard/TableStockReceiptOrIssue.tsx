import { useMemo, useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StockTransaction } from '@/types/dashboard';
import { VirtualTable } from '@/components/ui/VirtualTable';
import { stockService } from '@/services/stock.service';
import { Icon } from '@iconify/react';

export const TableStockReceiptOrIssue = () => {
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await stockService.getStockTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching stock transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const columns = useMemo<ColumnDef<StockTransaction>[]>(
    () => [
      {
        id: 'timestamp',
        accessorKey: 'timestamp',
        header: () => (
          <span className="w-[120px] flex-shrink-0">Timestamp</span>
        ),
        cell: ({ getValue }) => (
          <span className="w-[120px] flex-shrink-0">
            {getValue() as string}
          </span>
        ),
      },
      {
        id: 'product',
        accessorKey: 'name',
        header: () => (
          <span className="flex-grow min-w-[200px]">Item Name</span>
        ),
        cell: ({ row }) => (
          <span className="flex-grow min-w-[200px] flex gap-[10px] items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-7 h-7 rounded-[4px] object-cover"
            />
            <span className="flex flex-col items-start justify-center">
              <span>{row.original.name}</span>
              <span className="text-[12px] text-[#64748B]">
                {row.original.id}
              </span>
            </span>
          </span>
        ),
      },
      {
        id: 'event',
        accessorKey: 'type',
        header: () => (
          <span className="w-[100px] flex-grow text-right">Event</span>
        ),
        cell: ({ row }) => (
          <span className="w-[100px] flex-grow flex gap-[10px] items-center justify-end">
            <span>{row.original.quantity}</span>
            <span className="text-[#94A3B8]">{row.original.unit}</span>
            <Icon
              width={20}
              height={20}
              icon={
                row.original.type === 'Receipt'
                  ? 'solar:square-arrow-right-down-bold'
                  : 'solar:square-arrow-left-up-bold'
              }
              color={row.original.type === 'Receipt' ? '#00B69B' : '#EF4444'}
            />
          </span>
        ),
      },
    ],
    []
  );

  return (
    <VirtualTable
      title="Stock Receipt / Issue"
      data={transactions}
      columns={columns}
    />
  );
};
