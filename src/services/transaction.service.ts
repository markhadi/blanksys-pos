import latestTransactions from '@/data/latestTransactions.json';
import { Transaction } from '@/types/dashboard';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const transactionService = {
  getLatestTransactions: async (): Promise<Transaction[]> => {
    await delay(500);

    return latestTransactions.map((item) => ({
      id: item.transactionId,
      timestamp: formatTimestamp(item.timestamp),
      amount: formatAmount(item.amount),
      status: item.status.toLowerCase() as Transaction['status'],
    }));
  },
};
