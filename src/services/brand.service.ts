import { BrandSearchParams, BrandType } from '@/types/brand';
import brandData from '@/data/brand.json';
import { CreateFormData } from '@/schema/brand';

export const BrandService = {
  fetchBrands: async ({ search, sorting }: BrandSearchParams = {}): Promise<
    BrandType[]
  > => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let brands = [...brandData] as BrandType[];

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      brands = brands.filter((brand) =>
        brand.brandName.toLowerCase().includes(normalizedSearch)
      );
    }

    if (sorting) {
      const { field, order } = sorting;
      brands.sort((a, b) => {
        const aValue = String(a[field as keyof BrandType]);
        const bValue = String(b[field as keyof BrandType]);
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return brands;
  },

  createBrand: async (data: CreateFormData): Promise<BrandType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newBrand: BrandType = {
      id: Math.max(...brandData.map((b) => b.id)) + 1,
      brandName: data.brandName,
    };

    brandData.push(newBrand);
    return newBrand;
  },
};
