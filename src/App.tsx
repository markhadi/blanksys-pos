import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { UserProvider } from '@/contexts/UserContext';
import { router } from '@/routes';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
