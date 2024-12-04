import { Suspense } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { useMasterPrices } from '@/hooks/master-price/useMasterPrice';

export const Cashier = () => {
  const { data: items, isLoading: isLoadingItems } = useMasterItems({});
  const { data: prices, isLoading: isLoadingPrices } = useMasterPrices({});

  const products = items?.map((item) => {
    const itemPrices =
      prices?.filter((price) => price.id_item === item.id) || [];
    const defaultPrice = itemPrices[0];

    return {
      id: item.id,
      imageUrl: item.image || 'https://via.placeholder.com/150',
      name: item.itemName,
      category: item.category,
      brand: item.brand,
      price: defaultPrice?.selling_price || 0,
      stock: item.stock,
      unit: item.unit,
    };
  });

  const handleAddToCart = (productId: string) => {
    // TODO: Implement add to cart logic
    console.log('Adding to cart:', productId);
  };

  if (isLoadingItems || isLoadingPrices) {
    return (
      <div className="flex flex-col gap-5">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-h-[calc(100vh-120px)] overflow-y-auto">
      {products?.map((product) => (
        <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
          <ProductCard
            imageUrl={product.imageUrl}
            name={product.name}
            category={product.category}
            brand={product.brand}
            price={product.price}
            stock={product.stock}
            unit={product.unit}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        </Suspense>
      ))}
    </div>
  );
};
