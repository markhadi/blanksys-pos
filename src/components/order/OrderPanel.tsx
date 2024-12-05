import { OrderActions } from './OrderActions';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { OrderItem } from './OrderCard';
import { OrderForm } from './OrderForm';
import { CustomerFormData } from '@/types/order';
import { useCart } from '@/contexts/CartContext';
import { EmptyState } from './EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const OrderPanel = () => {
  const {
    items: orderItems,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(
      z.object({
        customerName: z
          .string()
          .min(1, { message: 'Customer name is required' }),
        note: z.string().optional(),
      })
    ),
    defaultValues: {
      customerName: '',
      note: '',
    },
  });

  const handleSubmit = (formData: CustomerFormData) => {
    const orderData = {
      customer: formData,
      items: orderItems,
      total: calculateTotal(orderItems),
      timestamp: new Date().toISOString(),
    };

    console.log('Order Data:', orderData);
    clearCart();
    form.reset();

    // TODO: Send to API
  };

  const handleIncrement = (id: string) => {
    const item = orderItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const item = orderItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const calculateTotal = (
    items: Array<{ price: number; quantity: number }>
  ) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleClear = () => {
    clearCart();
  };
  const handlePrint = () => console.log('Print order');
  const handleSave = () => console.log('Save order');

  return (
    <section className="bg-white rounded-xl p-6 md:px-12 md:py-7 shadow-lg flex flex-col h-full">
      <h2 className="text-[22px] font-bold mb-3">ORDER</h2>
      <div className="flex flex-col gap-5 justify-between h-full">
        <Tabs defaultValue="cart">
          <TabsList>
            <TabsTrigger value="cart">
              Cart <span className="ml-1">({orderItems.length})</span>
            </TabsTrigger>
            <TabsTrigger value="order-list">Order List</TabsTrigger>
          </TabsList>
          <TabsContent value="cart">
            <div className="flex flex-col max-h-96 sm:max-h-80 overflow-y-auto">
              {orderItems.length > 0 ? (
                orderItems.map((item) => (
                  <OrderItem
                    key={item.id}
                    {...item}
                    onIncrement={() => handleIncrement(item.id)}
                    onDecrement={() => handleDecrement(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))
              ) : (
                <EmptyState />
              )}
            </div>

            <OrderForm form={form} onSubmit={handleSubmit}>
              <OrderActions
                total={calculateTotal(orderItems)}
                onClear={handleClear}
                onPrint={handlePrint}
                onSave={handleSave}
                onCheckout={form.handleSubmit(handleSubmit)}
                isSubmitting={form.formState.isSubmitting}
                itemCount={orderItems.length}
              />
            </OrderForm>
          </TabsContent>
          <TabsContent value="order-list">
            <div className="flex flex-col max-h-96 sm:max-h-80 overflow-y-auto border border-[#94A3B8] rounded-lg px-2">
              <button
                role="button"
                onClick={() => {
                  console.log('tampilkan detail');
                }}
                className="flex items-start gap-2 sm:items-center justify-between border-b border-[#94A3B8] py-2 flex-col sm:flex-row"
              >
                <div className="flex items-center gap-5">
                  <span className="h-12 w-12 grid place-content-center rounded-full bg-[#475569] text-white text[20px] leading-[28px] font-semibold">
                    TE
                  </span>
                  <div className="flex flex-col items-start">
                    <h3 className="text-[20px] leading-[28px] font-semibold">
                      Test
                    </h3>
                    <p className="text-[#475569] leading-[28px]">
                      TRX-2412010011
                    </p>
                  </div>
                </div>
                <span className="font-bold text-[#475569] text-right w-full sm:w-max">
                  $ 10.000
                </span>
              </button>

              <button
                role="button"
                onClick={() => {
                  console.log('tampilkan detail');
                }}
                className="flex items-start gap-2 sm:items-center justify-between border-b border-[#94A3B8] py-2 flex-col sm:flex-row"
              >
                <div className="flex items-center gap-5">
                  <span className="h-12 w-12 grid place-content-center rounded-full bg-[#475569] text-white text[20px] leading-[28px] font-semibold">
                    EM
                  </span>
                  <div className="flex flex-col items-start">
                    <h3 className="text-[20px] leading-[28px] font-semibold">
                      Emet
                    </h3>
                    <p className="text-[#475569] leading-[28px]">
                      TRX-2412010012
                    </p>
                  </div>
                </div>
                <span className="font-bold text-[#475569] text-right w-full sm:w-max">
                  $ 1.000
                </span>
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
