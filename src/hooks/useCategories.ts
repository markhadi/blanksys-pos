import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CategoryService } from '@/services/category.service';
import { Category } from '@/types/category';

const CATEGORY_QUERY_KEY = 'categories' as const;

export const useCategories = (
  searchQuery?: string
): UseQueryResult<Category[]> => {
  return useQuery({
    queryKey: [CATEGORY_QUERY_KEY, searchQuery],
    queryFn: () =>
      searchQuery
        ? CategoryService.searchCategories(searchQuery)
        : CategoryService.fetchCategories(),
    staleTime: 1000 * 60 * 5,
  });
};
