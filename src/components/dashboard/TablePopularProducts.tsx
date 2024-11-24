import { useMemo, useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { PopularProduct } from '@/types/dashboard';
import { VirtualTable } from '@/components/ui/VirtualTable';
import { productService } from '@/services/product.service';

export const TablePopularProducts = () => {
  const [products, setProducts] = useState<PopularProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getPopularProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const columns = useMemo<ColumnDef<PopularProduct>[]>(
    () => [
      {
        id: 'id',
        accessorKey: 'id',
        header: () => (
          <span className="w-[89px] flex-shrink-0">Product ID</span>
        ),
        cell: ({ getValue }) => (
          <span className="w-[89px] flex-shrink-0">{getValue() as string}</span>
        ),
      },
      {
        id: 'product',
        accessorKey: 'name',
        header: () => <span className="flex-grow min-w-[200px]">Product</span>,
        cell: ({ row }) => (
          <span className="flex-grow min-w-[200px] flex gap-[10px] items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-7 h-7 rounded-[4px] object-cover"
            />
            <span>{row.original.name}</span>
          </span>
        ),
      },
      {
        id: 'stock',
        accessorKey: 'stock',
        header: () => <span className="w-[120px] text-right">Stock</span>,
        cell: ({ row }) => (
          <span className="w-[120px] flex gap-[10px] items-center justify-end">
            <span>{row.original.stock}</span>
            <span className="text-[#94A3B8]">{row.original.unit}</span>
          </span>
        ),
      },
    ],
    []
  );

  return (
    <VirtualTable title="Popular Products" data={products} columns={columns} />
  );
};
