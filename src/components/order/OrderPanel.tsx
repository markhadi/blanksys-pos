import { OrderActions } from './OrderActions';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { OrderItem } from './OrderCard';
import { OrderForm } from './OrderForm';
import { CustomerFormData, OrderHistory } from '@/types/order';
import { useCart } from '@/contexts/CartContext';
import { EmptyState } from './EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrderHistory } from '@/hooks/order/useOrderHistory';
import { OrderHistoryItem } from './OrderHistoryItem';

export const OrderPanel = () => {
  const { orders, saveOrder } = useOrderHistory();
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

  const handleSave = async () => {
    const result = await form.trigger();
    if (!result) {
      return;
    }

    const formData = form.getValues();
    const orderData = {
      customerName: formData.customerName,
      items: orderItems,
      total: calculateTotal(orderItems),
      timestamp: new Date().toISOString(),
      note: formData.note,
    };

    saveOrder(orderData);
    clearCart();
    form.reset();
  };

  const handleOrderClick = (order: OrderHistory) => {
    // TODO: Implement order detail view
    console.log('Order details:', order);
  };

  return (
    <section className="bg-white rounded-xl p-6 md:px-12 md:py-7 shadow-lg flex flex-col h-full">
      <h2 className="text-[22px] font-bold mb-3">ORDER</h2>
      <div className="flex flex-col h-full">
        <Tabs defaultValue="cart" className="flex flex-col gap-5 h-full">
          <TabsList>
            <TabsTrigger value="cart">
              Cart <span className="ml-1">({orderItems.length})</span>
            </TabsTrigger>
            <TabsTrigger value="order-list">
              Order List <span className="ml-1">({orders.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cart" className="h-full">
            <div className="flex flex-col h-full justify-between gap-10">
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
            </div>
          </TabsContent>

          <TabsContent value="order-list">
            <div className="flex flex-col max-h-96 sm:max-h-80 overflow-y-auto border border-[#94A3B8] rounded-lg px-2">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <OrderHistoryItem
                    key={order.id}
                    order={order}
                    onClick={handleOrderClick}
                  />
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  No orders yet
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
