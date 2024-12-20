import { useState, useEffect } from 'react';
import { OrderHistory } from '@/types/order';

export const useOrderHistory = () => {
  const [orders, setOrders] = useState<OrderHistory[]>(() => {
    const saved = localStorage.getItem('orderHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orders));
  }, [orders]);

  const saveOrder = (orderData: Omit<OrderHistory, 'id' | 'transactionId'>) => {
    const newOrder: OrderHistory = {
      ...orderData,
      id: crypto.randomUUID(),
      transactionId: `TRX-${Date.now().toString().slice(-10)}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  const editOrder = (orderId: string, orderData: Partial<OrderHistory>) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, ...orderData } : order
      )
    );
  };

  return {
    orders,
    saveOrder,
    deleteOrder,
    editOrder,
    setOrders,
  };
};
