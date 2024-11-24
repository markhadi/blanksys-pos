import { useMemo, useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '@/types/dashboard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { VirtualTable } from '@/components/ui/VirtualTable';
import { transactionService } from '@/services/transaction.service';

export const TableLatestTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  return (
    <VirtualTable
      title="Latest Transaction"
      data={transactions}
      columns={columns}
    />
  );
};
