import popularProducts from '@/data/popularProducts.json';
import { PopularProduct } from '@/types/dashboard';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  getPopularProducts: async (): Promise<PopularProduct[]> => {
    await delay(500);

    return popularProducts
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .map((item) => ({
        id: item.productId,
        name: item.name,
        image: item.imageUrl,
        stock: item.unitsSold,
        unit: item.units,
      }));
  },
};
