import { DetailReceive } from '@/components/receive/DetailReceive';
import { TableReceive } from '@/components/receive/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useReceiveDialogs } from '@/hooks/receive/useDialogs';
import { useReceiveMutations } from '@/hooks/receive/useMutations';
import { useReceives } from '@/hooks/receive/useReceive';
import { ReceiveTableRow } from '@/types/receive';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Receive = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedReceivers, setSelectedReceivers] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [detailDialog, setDetailDialog] = useState<{
    open: boolean;
    receive: ReceiveTableRow | null;
  }>({ open: false, receive: null });

  const { data: receives = [], isLoading } = useReceives({
    search: searchQuery,
    receive_by: selectedReceivers,
    supplier_name: selectedSuppliers,
    sorting:
      sorting.length > 0
        ? {
            field: sorting[0].id as keyof ReceiveTableRow,
            order: sorting[0].desc ? 'desc' : 'asc',
          }
        : undefined,
  });

  const tableData = Array.isArray(receives) ? receives : [];

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleReceiverFilter = (receivers: string[]) => {
    setSelectedReceivers(receivers);
  };

  const handleSupplierFilter = (suppliers: string[]) => {
    setSelectedSuppliers(suppliers);
  };

  const { deleteDialog, openDeleteDialog, closeDeleteDialog } =
    useReceiveDialogs();
  const { deleteMutation } = useReceiveMutations();

  const handleConfirmDelete = () => {
    if (deleteDialog.receive?.id_receive) {
      deleteMutation.mutate(deleteDialog.receive.id_receive);
      closeDeleteDialog();
    }
  };

  const openDetailDialog = (receive: ReceiveTableRow) => {
    setDetailDialog({ open: true, receive });
  };

  const closeDetailDialog = () => {
    setDetailDialog({ open: false, receive: null });
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
          label: 'New Receive',
          onClick: () => {
            localStorage.removeItem('receiveItems');
            navigate('/receive/create');
          },
        }}
      />

      <TableReceive
        data={tableData}
        isLoading={isLoading}
        onEdit={(receive) => navigate(`/receive/edit/${receive.id_receive}`)}
        onDelete={openDeleteDialog}
        onView={openDetailDialog}
        sorting={sorting}
        onSortingChange={setSorting}
        onReceiverFilter={handleReceiverFilter}
        onSupplierFilter={handleSupplierFilter}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.receive?.id_receive || ''}
        isLoading={deleteMutation.isPending}
      />

      <DetailReceive
        open={detailDialog.open}
        onClose={closeDetailDialog}
        receive={detailDialog.receive}
      />
    </div>
  );
};
