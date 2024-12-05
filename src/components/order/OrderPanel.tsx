import { OrderActions } from './OrderActions';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { OrderItem } from './OrderCard';
import { OrderForm } from './OrderForm';
import { CustomerFormData } from '@/types/order';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { EmptyState } from './EmptyState';

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
    toast({
      title: 'Success',
      description: 'Order checkout successfully',
    });

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
    <section className="bg-white rounded-xl px-12 py-7 shadow-lg flex flex-col h-full">
      <h2 className="text-[22px] font-bold">ORDER</h2>
      <div className="flex flex-col gap-5 justify-between h-full">
        <div className="flex flex-col max-h-80 overflow-y-auto">
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
    </section>
  );
};
