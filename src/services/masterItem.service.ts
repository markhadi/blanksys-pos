import masterItemData from '@/data/masterItem.json';
import { MasterItem, MasterItemSearchParams } from '@/types/master-item';

export const MasterItemService = {
  fetchMasterItems: async ({
    search,
    sorting,
    categories,
    brands,
  }: MasterItemSearchParams = {}): Promise<MasterItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let masterItems = [...masterItemData] as MasterItem[];

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      masterItems = masterItems.filter((item) =>
        item.itemName.toLowerCase().includes(normalizedSearch)
      );
    }

    if (sorting) {
      const { field, order } = sorting;
      masterItems.sort((a, b) => {
        const aValue = String(a[field as keyof MasterItem]);
        const bValue = String(b[field as keyof MasterItem]);
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    if (categories?.length) {
      masterItems = masterItems.filter((item) =>
        categories.includes(item.category)
      );
    }

    if (brands?.length) {
      masterItems = masterItems.filter((item) => brands.includes(item.brand));
    }

    return masterItems;
  },
};
