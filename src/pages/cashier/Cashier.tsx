import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { Suspense, useEffect, useState } from 'react';

export const Cashier = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setProducts([
          {
            id: '1',
            imageUrl: 'https://via.placeholder.com/150',
            name: 'Item Name',
            category: 'Category',
            brand: 'Brand',
            price: 1000,
            stock: 254,
          },
          {
            id: '2',
            imageUrl: 'https://via.placeholder.com/150',
            name: 'Item Name',
            category: 'Category',
            brand: 'Brand',
            price: 1000,
            stock: 0,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log(productId);
  };

  return (
    <div className="flex flex-col gap-5">
      {isLoading ? (
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      ) : (
        products.map((product) => (
          <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
            <ProductCard
              imageUrl={product.imageUrl}
              name={product.name}
              category={product.category}
              brand={product.brand}
              price={product.price}
              stock={product.stock}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          </Suspense>
        ))
      )}
    </div>
  );
};
