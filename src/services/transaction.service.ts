import latestTransactions from '@/data/latestTransactions.json';
import { Transaction } from '@/types/dashboard';
import { formatters } from '@/utils/formatters';
import transactionData from '@/data/transactions.json';
import { TransactionSearchParams, TransactionType } from '@/types/transaction';

export const TransactionService = {
  getLatestTransactions: async (): Promise<Transaction[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return latestTransactions.map((item) => ({
      id: item.transactionId,
      timestamp: formatters.timestamp(item.timestamp, 'full'),
      amount: formatters.currency(item.amount),
      status: item.status.toLowerCase() as Transaction['status'],
    }));
  },

  fetchTransactions: async ({
    search,
    sorting,
  }: TransactionSearchParams = {}): Promise<TransactionType[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let transactions = [...transactionData] as TransactionType[];

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      transactions = transactions.filter(
        (transaction) =>
          transaction.id_transaction.toLowerCase().includes(normalizedSearch) ||
          transaction.notes.toLowerCase().includes(normalizedSearch)
      );
    }

    if (sorting) {
      const { field, order } = sorting;
      transactions.sort((a, b) => {
        const aValue = String(a[field]);
        const bValue = String(b[field]);
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return transactions;
  },
};
