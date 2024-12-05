import { PackageSearch } from 'lucide-react';

export const ProductEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-16 h-16 mb-4 text-gray-400">
        <PackageSearch className="w-full h-full" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        No Products Found
      </h3>
      <p className="text-sm text-gray-500">
        Try adjusting your search or check back later for new products
      </p>
    </div>
  );
};
