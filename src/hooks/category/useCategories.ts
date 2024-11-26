import { useQuery } from '@tanstack/react-query';
import { CategoryService } from '@/services/category.service';
import { CategorySearchParams } from '@/types/category';

export const useCategories = (params: CategorySearchParams = {}) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => CategoryService.fetchCategories(params),
  });
};
