import masterPriceData from '@/data/masterPrice.json';
import {
  MasterPrice,
  MasterPriceDataType,
  MasterPriceSearchParams,
} from '@/types/master-price';
import { UnitService } from './unit.service';
import { MasterItemService } from './masterItem.service';
import {
  CreateMasterPriceFormData,
  UpdateMasterPriceFormData,
} from '@/schema/master-price';

export const MasterPriceService = {
  fetchMasterPrices: async ({
    search,
    sorting,
    categories,
    brands,
  }: MasterPriceSearchParams = {}): Promise<MasterPrice[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const [unitsData, masterItems] = await Promise.all([
      UnitService.fetchUnits({}),
      MasterItemService.fetchMasterItems({}),
    ]);

    const unitMap = new Map(unitsData.map((unit) => [unit.id, unit.unitName]));
    const itemMap = new Map(masterItems.map((item) => [item.id, item]));

    let masterPrices = [...masterPriceData] as MasterPrice[];

    masterPrices = masterPrices.map((price) => {
      const item = itemMap.get(price.id_item);
      return {
        ...price,
        unit: unitMap.get(price.id_unit) || 'Unknown',
        itemName: item?.itemName || 'Unknown',
        category: item?.category || 'Unknown',
        brand: item?.brand || 'Unknown',
        stock: item?.stock || 0,
      };
    });

    if (categories && categories.length > 0) {
      masterPrices = masterPrices.filter((price) =>
        categories.includes(price.category)
      );
    }

    if (brands && brands.length > 0) {
      masterPrices = masterPrices.filter((price) =>
        brands.includes(price.brand)
      );
    }

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      masterPrices = masterPrices.filter((price) =>
        price.itemName.toLowerCase().includes(normalizedSearch)
      );
    }

    if (sorting) {
      const { field, order } = sorting;
      masterPrices.sort((a, b) => {
        const aValue = String(a[field as keyof MasterPrice]);
        const bValue = String(b[field as keyof MasterPrice]);
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return masterPrices;
  },

  createMasterPrice: async (
    data: CreateMasterPriceFormData
  ): Promise<MasterPriceDataType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!data.id || !data.id_item || !data.id_unit) {
      throw new Error('Missing required fields');
    }

    const newMasterPrice: MasterPriceDataType = {
      id: data.id,
      id_item: data.id_item,
      id_unit: data.id_unit,
      capital_price: data.capital_price,
      selling_price: data.selling_price,
    };

    console.log('Creating new price:', newMasterPrice);
    masterPriceData.push(newMasterPrice);
    return newMasterPrice;
  },

  updateMasterPrice: async (
    id: string,
    data: UpdateMasterPriceFormData
  ): Promise<MasterPriceDataType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const priceIndex = masterPriceData.findIndex((price) => price.id === id);
    if (priceIndex === -1) throw new Error('Price not found');

    const updatedPrice = {
      ...masterPriceData[priceIndex],
      ...data,
    };

    masterPriceData[priceIndex] = updatedPrice;
    console.log('Updated price:', updatedPrice);
    return updatedPrice;
  },

  deleteMasterPrice: async (id: string): Promise<MasterPriceDataType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = masterPriceData.findIndex((price) => price.id === id);
    if (index === -1) {
      throw new Error('Price not found');
    }

    const deletedPrice = masterPriceData[index];
    masterPriceData.splice(index, 1);
    console.log('Deleted price:', deletedPrice);
    return deletedPrice;
  },
};
