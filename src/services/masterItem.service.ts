import masterItemData from '@/data/masterItem.json';
import { MasterItem, MasterItemSearchParams } from '@/types/master-item';
import { CategoryService } from './category.service';
import { BrandService } from './brand.service';
import { UnitService } from './unit.service';

export const MasterItemService = {
  fetchMasterItems: async ({
    search,
    sorting,
    categories,
    brands,
  }: MasterItemSearchParams = {}): Promise<MasterItem[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const [categoriesData, brandsData, unitsData] = await Promise.all([
      CategoryService.fetchCategories({}),
      BrandService.fetchBrands({}),
      UnitService.fetchUnits({}),
    ]);

    const categoryMap = new Map(
      categoriesData.map((cat) => [cat.id, cat.categoryName])
    );
    const brandMap = new Map(
      brandsData.map((brand) => [brand.id, brand.brandName])
    );
    const unitMap = new Map(unitsData.map((unit) => [unit.id, unit.unitName]));

    let masterItems = [...masterItemData] as MasterItem[];

    masterItems = masterItems.map((item) => ({
      ...item,
      category: categoryMap.get(item.idCategory) || 'Unknown',
      brand: brandMap.get(item.idBrand) || 'Unknown',
      unit: unitMap.get(item.idStockUnit) || 'Unknown',
    }));

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      masterItems = masterItems.filter((item) =>
        item.itemName.toLowerCase().includes(normalizedSearch)
      );
    }

    if (categories && categories.length > 0) {
      masterItems = masterItems.filter((item) =>
        categories.includes(item.category)
      );
    }

    if (brands && brands.length > 0) {
      masterItems = masterItems.filter((item) => brands.includes(item.brand));
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

    return masterItems;
  },
};
