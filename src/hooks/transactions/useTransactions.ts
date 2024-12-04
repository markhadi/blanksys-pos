import { useQuery } from '@tanstack/react-query';
import { TransactionService } from '@/services/transaction.service';
import { TransactionSearchParams } from '@/types/transaction';

export const useTransactions = (params: TransactionSearchParams = {}) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => TransactionService.fetchTransactions(params),
  });
};
