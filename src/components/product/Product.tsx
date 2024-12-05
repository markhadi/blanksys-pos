import { Suspense } from 'react';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductEmptyState } from '@/components/product/ProductEmptyState';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { useMasterPrices } from '@/hooks/master-price/useMasterPrice';
import { useCart } from '@/contexts/CartContext';

interface ProductProps {
  searchQuery: string;
}

export const Product = ({ searchQuery }: ProductProps) => {
  const { data: items, isLoading: isLoadingItems } = useMasterItems({
    search: searchQuery,
  });
  const { data: prices, isLoading: isLoadingPrices } = useMasterPrices({});
  const { addToCart } = useCart();

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

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      unit: product.unit,
    });
  };

  return (
    <div className="flex flex-col gap-5 max-h-[calc(100vh-176px)] overflow-y-auto">
      {isLoadingItems || isLoadingPrices ? (
        <div className="flex flex-col h-full gap-5">
          {Array.from({ length: 7 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products?.length === 0 ? (
        <ProductEmptyState />
      ) : (
        products?.map((product) => (
          <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
            <ProductCard
              imageUrl={product.imageUrl}
              name={product.name}
              category={product.category}
              brand={product.brand}
              price={product.price}
              stock={product.stock}
              unit={product.unit}
              onAddToCart={() => handleAddToCart(product)}
            />
          </Suspense>
        ))
      )}
    </div>
  );
};
