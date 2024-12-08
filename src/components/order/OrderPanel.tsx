import { OrderActions } from './OrderActions';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { OrderItem } from './OrderCard';
import { OrderForm } from './OrderForm';
import {
  CustomerFormData,
  OrderHistory,
  OrderItem as OrderItemType,
  OrderSummary,
} from '@/types/order';
import { useCart } from '@/contexts/CartContext';
import { EmptyState } from './EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrderHistory } from '@/hooks/order/useOrderHistory';
import { OrderHistoryItem } from './OrderHistoryItem';
import { OrderDetail } from './OrderDetail';
import { useState } from 'react';
import { TransactionDialog } from './TransactionDialog';

export const OrderPanel = () => {
  const {
    items: orderItems,
    updateQuantity,
    removeItem,
    clearCart,
    addToCart,
  } = useCart();
  const { orders, saveOrder, deleteOrder, editOrder, setOrders } =
    useOrderHistory();
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
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

  const calculateTotal = (
    items: Array<{ price: number; quantity: number }>
  ) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const total = calculateTotal(orderItems);
  const tax = total * 0.11; // 11% tax
  const discount = 0;
  const cutPrice = (total * discount) / 100;
  const subtotal = total - cutPrice + tax;

  const [transactionData, setTransactionData] = useState<{
    orderId?: string;
    items: OrderItemType[];
    summary: OrderSummary;
  } | null>(null);

  const handleSubmit = (formData: CustomerFormData) => {
    const savedOrder = saveOrder({
      customerName: formData.customerName,
      items: orderItems,
      total,
      subtotal,
      discount,
      cutPrice,
      tax,
      timestamp: new Date().toISOString(),
      note: formData.note,
    });

    console.log('Order Data:', savedOrder);

    setTransactionData({
      orderId: savedOrder.id,
      items: orderItems,
      summary: {
        subtotal,
        discount,
        cutPrice,
        tax,
        total,
      },
    });

    handleTransactionDialogOpen();
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

  const handleClear = () => {
    setEditingOrderId(null);
    form.reset({
      customerName: '',
      note: '',
    });
    clearCart();
  };

  const handlePrint = () => console.log('Print order');

  const handleEdit = () => {
    if (selectedOrder) {
      setEditingOrderId(selectedOrder.id);
      // Pre-fill form
      form.reset({
        customerName: selectedOrder.customerName,
        note: selectedOrder.note || '',
      });

      // Clear existing cart first
      clearCart();

      // Add items to cart one by one
      selectedOrder.items.forEach((item) => {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          unit: item.unit,
        });
        // Update quantity after adding
        updateQuantity(item.id, item.quantity);
      });

      setSelectedOrder(null);
    }
  };

  const handleSave = async () => {
    const result = await form.trigger();
    if (!result) return;

    const formData = form.getValues();
    const orderData = {
      customerName: formData.customerName,
      items: orderItems,
      total,
      subtotal,
      discount,
      cutPrice,
      tax,
      timestamp: new Date().toISOString(),
      note: formData.note,
    };

    if (editingOrderId) {
      editOrder(editingOrderId, orderData);
      setEditingOrderId(null);
    } else {
      saveOrder(orderData);
    }

    clearCart();
    form.reset({
      customerName: '',
      note: '',
    });
    setSelectedOrder(null);
  };

  const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);

  const handleOrderClick = (order: OrderHistory) => {
    setSelectedOrder(order);
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  const handleDelete = () => {
    if (selectedOrder) {
      deleteOrder(selectedOrder.id);
      setSelectedOrder(null);
    }
  };

  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);

  const handleTransactionDialogClose = () => {
    setOpenTransactionDialog(false);
  };

  const handleTransactionDialogOpen = () => {
    setOpenTransactionDialog(true);
  };

  const handleComplete = () => {
    if (selectedOrder) {
      setTransactionData({
        orderId: selectedOrder.id,
        items: selectedOrder.items,
        summary: {
          subtotal: selectedOrder.subtotal,
          discount: selectedOrder.discount,
          cutPrice: selectedOrder.cutPrice,
          tax: selectedOrder.tax,
          total: selectedOrder.total,
        },
      });
      setOpenTransactionDialog(true);
      setSelectedOrder(null);
    }
  };

  return (
    <>
      <section className="bg-white rounded-xl p-6 md:px-12 md:py-7 shadow-lg flex flex-col h-full">
        {selectedOrder ? (
          <OrderDetail
            orderId={selectedOrder.transactionId}
            customerName={selectedOrder.customerName}
            note={selectedOrder.note || '-'}
            items={selectedOrder.items}
            summary={{
              subtotal: selectedOrder.subtotal,
              discount: selectedOrder.discount,
              cutPrice: selectedOrder.cutPrice,
              tax: selectedOrder.tax,
              total: selectedOrder.total,
            }}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPrint={() => {}}
            onComplete={handleComplete}
          />
        ) : (
          <>
            <h2 className="text-[22px] font-bold mb-3">ORDER</h2>
            <div className="flex flex-col h-full">
              <Tabs defaultValue="cart" className="flex flex-col gap-5 h-full">
                <TabsList>
                  <TabsTrigger value="cart">
                    Cart{' '}
                    <span className="ml-1">({orderItems.length || 0})</span>
                  </TabsTrigger>
                  <TabsTrigger value="order-list">
                    Order List{' '}
                    <span className="ml-1">({orders?.length || 0})</span>
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
                        isEditing={!!editingOrderId}
                      />
                    </OrderForm>
                  </div>
                </TabsContent>

                <TabsContent value="order-list">
                  <div className="flex flex-col max-h-96 sm:max-h-80 overflow-y-auto border border-[#94A3B8] rounded-lg px-2">
                    {orders?.length > 0 ? (
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
          </>
        )}
      </section>

      <TransactionDialog
        open={openTransactionDialog}
        onClose={handleTransactionDialogClose}
        items={transactionData?.items || selectedOrder?.items || []}
        orderId={transactionData?.orderId || selectedOrder?.id}
        summary={
          transactionData?.summary || {
            subtotal: 0,
            discount: 0,
            cutPrice: 0,
            tax: 0,
            total: 0,
          }
        }
        onTransactionComplete={() => {
          console.log('TransactionData:', transactionData);
          console.log('SelectedOrder:', selectedOrder);
          console.log('OrderId from transaction:', transactionData?.orderId);
          console.log('OrderId from selected:', selectedOrder?.id);

          const idToDelete = transactionData?.orderId || selectedOrder?.id;
          console.log('ID to delete:', idToDelete);
          if (idToDelete) {
            const updatedOrders = orders.filter(
              (order) => order.id !== idToDelete
            );
            setOrders(updatedOrders);
          }
          setSelectedOrder(null);
        }}
      />
    </>
  );
};
