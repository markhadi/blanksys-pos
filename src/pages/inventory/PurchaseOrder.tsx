import { TablePurchaseOrder } from '@/components/purchase-order/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { usePurchaseOrderDialogs } from '@/hooks/purchase-order/useDialogs';
import { usePurchaseOrderMutations } from '@/hooks/purchase-order/useMutations';
import { usePurchaseOrders } from '@/hooks/purchase-order/usePurchaseOrder';
import {
  PurchaseOrderStatus,
  PurchaseOrderTableRow,
} from '@/types/purchaseOrder';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PurchaseOrder = () => {
  const navigate = useNavigate();
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

  const tableData = Array.isArray(purchaseOrders) ? purchaseOrders : [];

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleStatusFilter = (statuses: string[]) => {
    setSelectedStatuses(statuses as PurchaseOrderStatus[]);
  };

  const handleCreatorFilter = (creators: string[]) => {
    setSelectedCreators(creators);
  };

  const { deleteDialog, openDeleteDialog, closeDeleteDialog } =
    usePurchaseOrderDialogs();
  const { deleteMutation } = usePurchaseOrderMutations();

  const handleConfirmDelete = () => {
    if (deleteDialog.purchaseOrder?.id_po) {
      deleteMutation.mutate(deleteDialog.purchaseOrder.id_po);
      closeDeleteDialog();
    }
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
          onClick: () => {
            localStorage.removeItem('purchaseOrderItems');
            navigate('/purchase-order/create-po');
          },
        }}
      />

      <TablePurchaseOrder
        data={tableData}
        isLoading={isLoading}
        onEdit={(po) => navigate(`/purchase-order/edit/${po.id_po}`)}
        onDelete={openDeleteDialog}
        onView={() => {}}
        sorting={sorting}
        onSortingChange={setSorting}
        onStatusFilter={handleStatusFilter}
        onCreatorFilter={handleCreatorFilter}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.purchaseOrder?.id_po || ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
