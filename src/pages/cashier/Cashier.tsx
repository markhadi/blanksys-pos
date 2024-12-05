import { Suspense, useState, useEffect } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { useMasterPrices } from '@/hooks/master-price/useMasterPrice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormControl,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Printer, Save, Trash2 } from 'lucide-react';

export const Cashier = () => {
  const { data: items, isLoading: isLoadingItems } = useMasterItems({});
  const { data: prices, isLoading: isLoadingPrices } = useMasterPrices({});

  const [prevItemsCount, setPrevItemsCount] = useState(0);

  interface CustomerFormData {
    customerName: string;
    note: string;
  }

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(
      z.object({
        customerName: z
          .string()
          .min(1, { message: 'Customer name is required' }),
        note: z.string().optional(),
      })
    ),
  });

  const handleSubmit = (data: CustomerFormData) => {
    console.log(data);
  };

  useEffect(() => {
    if (items?.length) {
      setPrevItemsCount(items.length);
    }
  }, [items]);

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
    const skeletonCount = prevItemsCount || 10;

    return (
      <div className="flex flex-col gap-5">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5">
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

      <div className="bg-white rounded-xl px-12 py-7 shadow-lg flex flex-col">
        <h2 className="text-[22px] font-bold">ORDER</h2>
        <div className="flex flex-col gap-5 justify-between h-full">
          <div className="flex flex-col max-h-80 overflow-y-auto">
            <div className="flex items-center gap-5 justify-between p-3 border-b border-[#DDDDDD]">
              <div className="flex items-center gap-5">
                <img
                  src="https://via.placeholder.com/46"
                  alt=""
                  height={46}
                  width={46}
                  className="rounded-md"
                />
                <div>
                  <h3 className="text-[18px] font-bold">Item Name</h3>
                  <p className="text-[16px]">
                    $ 1.000 / <span>pcs</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-[20px]">$ 2.000</span>

                <div className="flex items-center gap-2 bg-[#F1F5F9]">
                  <Button size="icon" className="max-h-[30px] max-w-[30px]">
                    -
                  </Button>
                  <span className="text-[20px] w-10 text-center">2</span>
                  <Button size="icon" className="max-h-[30px] max-w-[30px]">
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 justify-between p-3 border-b border-[#DDDDDD]">
              <div className="flex items-center gap-5">
                <img
                  src="https://via.placeholder.com/46"
                  alt=""
                  height={46}
                  width={46}
                  className="rounded-md"
                />
                <div>
                  <h3 className="text-[18px] font-bold">Item Name1</h3>
                  <p className="text-[16px]">
                    $ 1.100 / <span>pcs</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-[20px]">$ 1.100</span>

                <div className="flex items-center gap-2 bg-[#F1F5F9]">
                  <Button size="icon" className="max-h-[30px] max-w-[30px]">
                    -
                  </Button>
                  <span className="text-[20px] w-10 text-center">1</span>
                  <Button size="icon" className="max-h-[30px] max-w-[30px]">
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-6">
                <span className="text-[20px] font-poppins">Total:</span>
                <span className="text-[36px] font-poppins font-bold">
                  $ 3.100
                </span>
              </div>
              <div className="flex items-center justify-end gap-4">
                <Button
                  variant="outline"
                  className="w-full font-inter text-[20px] h-14"
                  type="reset"
                >
                  <Trash2 />
                  Clear
                </Button>
                <Button
                  variant="outline"
                  className="w-full font-inter text-[20px] h-14"
                  type="button"
                >
                  <Printer />
                  Print
                </Button>
                <Button
                  variant="outline"
                  className="w-full font-inter text-[20px] h-14"
                  type="button"
                >
                  <Save />
                  Save
                </Button>
                <Button
                  className="w-full font-inter text-[20px] h-14 font-bold"
                  type="submit"
                >
                  Checkout
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
