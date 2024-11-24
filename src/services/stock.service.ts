import stockData from '@/data/stockReceiptIssued.json';
import { StockTransaction } from '@/types/dashboard';
import { formatters } from '@/utils/formatters';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const stockService = {
  getStockTransactions: async (): Promise<StockTransaction[]> => {
    await delay(500);

    return stockData.map((item) => ({
      id: item.stockId,
      name: item.itemName,
      image: item.imageUrl,
      timestamp: formatters.timestamp(item.timestamp, 'short'),
      quantity: item.quantity,
      unit: item.units,
      type: item.type as 'Receipt' | 'Issued',
    }));
  },
};
