import { OrderPanel } from '@/components/order/OrderPanel';
import { Product } from '@/components/product/Product';
import { Search } from '@/components/ui/search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export const Cashier = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5 h-full">
      <Tabs defaultValue="general">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>

          <Search
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
          />
        </div>
        <TabsContent value="general">
          <Product searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="recent">
          <Product searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="popular">
          <Product searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>

      <OrderPanel />
    </div>
  );
};
