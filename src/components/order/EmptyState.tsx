import { ShoppingCart } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
      <ShoppingCart size={64} strokeWidth={1} />
      <div className="text-center">
        <h3 className="text-lg font-semibold">Your cart is empty</h3>
        <p className="text-sm">Add some items to your cart to get started</p>
      </div>
    </div>
  );
};
