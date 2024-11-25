import categoryData from '@/data/category.json';
import { Category, CategorySearchParams } from '@/types/category';
import { CreateFormData, UpdateFormData } from '@/schema/category';

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

  createCategory: async (data: CreateFormData): Promise<Category> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newCategory: Category = {
      id: Math.max(...categoryData.map((c) => c.id)) + 1,
      categoryName: data.categoryName,
    };

    categoryData.push(newCategory);
    return newCategory;
  },

  updateCategory: async (
    id: number,
    data: UpdateFormData
  ): Promise<Category> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = categoryData.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }

    const updatedCategory: Category = {
      ...categoryData[index],
      ...data,
    };

    categoryData[index] = updatedCategory;
    return updatedCategory;
  },

  deleteCategory: async (id: number): Promise<Category> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = categoryData.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }

    const deletedCategory = categoryData[index];
    categoryData.splice(index, 1);
    return deletedCategory;
  },
};
