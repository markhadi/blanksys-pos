import categoryData from '@/data/category.json';
import { Category } from '@/types/category';

export const CategoryService = {
  fetchCategories: async (): Promise<Category[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return categoryData as Category[];
  },

  searchCategories: async (query: string): Promise<Category[]> => {
    const categories = await CategoryService.fetchCategories();
    return categories.filter((category) =>
      category.categoryName.toLowerCase().includes(query.toLowerCase())
    );
  },
};
