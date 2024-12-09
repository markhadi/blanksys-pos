import { TablePurchaseOrder } from '@/components/purchase-order/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { usePurchaseOrders } from '@/hooks/purchase-order/usePurchaseOrder';
import {
  PurchaseOrderStatus,
  PurchaseOrderTableRow,
} from '@/types/purchaseOrder';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';

export const PurchaseOrder = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<
    PurchaseOrderStatus[]
  >([]);
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);

  const { data: purchaseOrders = [], isLoading } = usePurchaseOrders({
    search: searchQuery,
    status: selectedStatuses,
    created_by: selectedCreators,
    sorting:
      sorting.length > 0
        ? {
            field: sorting[0].id as keyof PurchaseOrderTableRow,
            order: sorting[0].desc ? 'desc' : 'asc',
          }
        : undefined,
  });

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleStatusFilter = (statuses: string[]) => {
    setSelectedStatuses(statuses as PurchaseOrderStatus[]);
  };

  const handleCreatorFilter = (creators: string[]) => {
    setSelectedCreators(creators);
  };

  return (
    <div className="flex-grow">
      <ActionHeader
        searchProps={{
          value: searchValue,
          onChange: setSearchValue,
          onSearch: handleSearch,
        }}
        actionButton={{
          label: 'New Item Request',
          onClick: () => {},
        }}
      />

      <TablePurchaseOrder
        data={purchaseOrders}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
        onView={() => {}}
        sorting={sorting}
        onSortingChange={setSorting}
        onStatusFilter={handleStatusFilter}
        onCreatorFilter={handleCreatorFilter}
      />
    </div>
  );
};
