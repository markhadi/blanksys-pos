import masterItemData from '@/data/masterItem.json';
import {
  MasterItem,
  MasterItemDataType,
  MasterItemSearchParams,
} from '@/types/master-item';
import { CategoryService } from './category.service';
import { BrandService } from './brand.service';
import { UnitService } from './unit.service';
import {
  CreateMasterItemFormData,
  UpdateMasterItemFormData,
} from '@/schema/master-item';

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
      masterItems = masterItems.filter(
        (item) =>
          item.itemName.toLowerCase().includes(normalizedSearch) ||
          item.category.toLowerCase().includes(normalizedSearch) ||
          item.brand.toLowerCase().includes(normalizedSearch)
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

  createMasterItem: async (
    data: CreateMasterItemFormData
  ): Promise<MasterItemDataType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let imageUrl = data.image;

    if (data.image && data.image.startsWith('data:image')) {
      try {
        // 1. Upload ke cloud storage (S3, Cloudinary, Firebase Storage, dll)
        // 2. Compress image sebelum upload
        // 3. Validasi ukuran dan format
        // 4. Generate berbagai ukuran (thumbnail, medium, large)
        // const uploadedImage = await uploadToCloudStorage(data.image);
        // imageUrl = uploadedImage.url;

        imageUrl = 'https://via.placeholder.com/150';
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
      }
    }

    const newMasterItem: MasterItemDataType = {
      image: imageUrl || '',
      stock: 0,
      id: data.id,
      itemName: data.itemName,
      idCategory: data.idCategory,
      idBrand: data.idBrand,
      capitalPrice: data.capitalPrice,
      idStockUnit: data.idStockUnit,
    };

    console.log(newMasterItem);

    masterItemData.push(newMasterItem);

    return newMasterItem;
  },

  updateMasterItem: async (
    id: string,
    data: UpdateMasterItemFormData
  ): Promise<MasterItemDataType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let imageUrl = data.image;

    if (data.image && data.image.startsWith('data:image')) {
      try {
        imageUrl = 'https://via.placeholder.com/150';
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
      }
    }

    const itemIndex = masterItemData.findIndex((item) => item.id === id);
    if (itemIndex === -1) throw new Error('Item not found');

    const updatedItem = {
      ...masterItemData[itemIndex],
      ...data,
      image: imageUrl || '',
    };

    console.log(updatedItem);

    masterItemData[itemIndex] = updatedItem;
    return updatedItem;
  },

  deleteMasterItem: async (id: string): Promise<MasterItemDataType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = masterItemData.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('Item not found');
    }

    const deletedItem = masterItemData[index];
    masterItemData.splice(index, 1);

    console.log(deletedItem);
    return deletedItem;
  },
};
