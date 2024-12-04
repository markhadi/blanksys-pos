import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  imageUrl: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock?: number;
  unit: string;
  onAddToCart: () => void;
}

export const ProductCard = ({
  imageUrl,
  name,
  category,
  brand,
  price,
  stock,
  unit,
  onAddToCart,
}: ProductCardProps) => {
  const isOutOfStock = typeof stock === 'undefined' || stock === 0;
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="flex flex-grow flex-wrap items-center justify-between gap-5 p-3 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-md" />
          )}
          <img
            src={imageUrl}
            alt={`Product image of ${name}`}
            className={`max-w-24 rounded-md transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[20px] font-poppins font-bold">{name}</h2>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-poppins bg-[#475569] text-white rounded-lg px-2">
              {category}
            </span>
            <span className="text-[14px] font-poppins bg-[#64748B] text-white rounded-lg px-2">
              {brand}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isOutOfStock ? (
              <span className="text-[14px] font-poppins text-[#EF4444]">
                Out of stock
              </span>
            ) : (
              <>
                <span className="text-[#22C55E] text-[14px] font-poppins font-semibold">
                  {stock}
                </span>
                <span className="text-[14px] font-poppins text-[#475569]">
                  {unit} available
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-[20px] font-poppins">
          $ {price.toLocaleString()}
        </span>
        <Button
          onClick={onAddToCart}
          disabled={isOutOfStock}
          className="text-[16px] font-medium"
        >
          Add
        </Button>
      </div>
    </article>
  );
};
