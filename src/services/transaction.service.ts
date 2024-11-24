import latestTransactions from '@/data/latestTransactions.json';
import { Transaction } from '@/types/dashboard';
import { formatters } from '@/utils/formatters';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const transactionService = {
  getLatestTransactions: async (): Promise<Transaction[]> => {
    await delay(500);

    return latestTransactions.map((item) => ({
      id: item.transactionId,
      timestamp: formatters.timestamp(item.timestamp, 'full'),
      amount: formatters.currency(item.amount),
      status: item.status.toLowerCase() as Transaction['status'],
    }));
  },
};
