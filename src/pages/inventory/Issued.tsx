import { DetailIssued } from '@/components/issued/DetailIssued';
import { TableIssued } from '@/components/issued/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useIssuedDialogs } from '@/hooks/issued/useDialogs';
import { useIssuedMutations } from '@/hooks/issued/useMutations';
import { useIssued } from '@/hooks/issued/useIssued';
import { IssuedTableRow } from '@/types/issued';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Issued = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);
  const [detailDialog, setDetailDialog] = useState<{
    open: boolean;
    issued: IssuedTableRow | null;
  }>({ open: false, issued: null });

  const { data: issueds = [], isLoading } = useIssued({
    search: searchQuery,
    issuedBy: selectedIssuers,
    sorting:
      sorting.length > 0
        ? {
            field: sorting[0].id as keyof IssuedTableRow,
            order: sorting[0].desc ? 'desc' : 'asc',
          }
        : undefined,
  });

  const tableData = Array.isArray(issueds) ? issueds : [];

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleIssuedByFilter = (issuers: string[]) => {
    setSelectedIssuers(issuers);
  };

  const { deleteDialog, openDeleteDialog, closeDeleteDialog } =
    useIssuedDialogs();
  const { deleteMutation } = useIssuedMutations();

  const handleConfirmDelete = () => {
    if (deleteDialog.issued?.id) {
      deleteMutation.mutate(deleteDialog.issued.id);
      closeDeleteDialog();
    }
  };

  const openDetailDialog = (issued: IssuedTableRow) => {
    setDetailDialog({ open: true, issued });
  };

  const closeDetailDialog = () => {
    setDetailDialog({ open: false, issued: null });
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
          label: 'New Issued',
          onClick: () => {
            localStorage.removeItem('issuedItems');
            navigate('/issued/create');
          },
        }}
      />

      <TableIssued
        data={tableData}
        isLoading={isLoading}
        onEdit={(issued) => navigate(`/issued/edit/${issued.id}`)}
        onDelete={openDeleteDialog}
        onView={openDetailDialog}
        sorting={sorting}
        onSortingChange={setSorting}
        onIssuedByFilter={handleIssuedByFilter}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.issued?.id || ''}
        isLoading={deleteMutation.isPending}
      />

      <DetailIssued
        open={detailDialog.open}
        onClose={closeDetailDialog}
        issued={detailDialog.issued}
      />
    </div>
  );
};
