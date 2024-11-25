import categoryData from '@/data/category.json';
import { Category, CategorySearchParams } from '@/types/category';

export const CategoryService = {
  fetchCategories: async ({
    search,
    sorting,
  }: CategorySearchParams = {}): Promise<Category[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let categories = [...categoryData] as Category[];

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      categories = categories.filter((category) =>
        category.categoryName.toLowerCase().includes(normalizedSearch)
      );
    }

    if (sorting) {
      const { field, order } = sorting;
      categories.sort((a, b) => {
        const aValue = String(a[field as keyof Category]);
        const bValue = String(b[field as keyof Category]);
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return categories;
  },
};
