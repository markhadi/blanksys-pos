import stockData from '@/data/stockReceiptIssued.json';
import { StockTransaction } from '@/types/dashboard';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const stockService = {
  getStockTransactions: async (): Promise<StockTransaction[]> => {
    await delay(500);

    return stockData.map((item) => ({
      id: item.stockId,
      name: item.itemName,
      image: item.imageUrl,
      timestamp: formatTimestamp(item.timestamp),
      quantity: item.quantity,
      unit: item.units,
      type: item.type as 'Receipt' | 'Issued',
    }));
  },
};
