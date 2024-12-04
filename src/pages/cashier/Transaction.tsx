import { TableTransaction } from '@/components/transactions/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { useTransactions } from '@/hooks/transactions/useTransactions';
import { TransactionType } from '@/types/transaction';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import * as XLSX from 'xlsx';

export const Transaction = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: transactions = [], isLoading } = useTransactions({
    search: searchQuery,
    sorting:
      sorting.length > 0
        ? {
            field: sorting[0].id as keyof TransactionType,
            order: sorting[0].desc ? 'desc' : 'asc',
          }
        : undefined,
  });

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleDownload = () => {
    const exportData = transactions.map((transaction) => ({
      'Transaction ID': transaction.id_transaction,
      Timestamp: new Date(transaction.timestamp).toLocaleString(),
      Quantity: transaction.qty,
      Unit: transaction.unit,
      Transaction: `${transaction.transaction.toFixed(2)}`,
      Status: transaction.status,
      Notes: transaction.notes,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

    const date = new Date().toISOString().split('T')[0];
    const fileName = `transactions_${date}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="flex-grow">
      <ActionHeader
        searchProps={{
          value: searchValue,
          onChange: setSearchValue,
          onSearch: handleSearch,
        }}
        actionButton={{
          label: 'Download',
          onClick: handleDownload,
        }}
      />

      <TableTransaction
        data={transactions}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
        sorting={sorting}
        onSortingChange={setSorting}
        onStatusFilter={() => {}}
      />
    </div>
  );
};
