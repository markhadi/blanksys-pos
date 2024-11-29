import { FormUser } from '@/components/user/FormUser';
import { TableUser } from '@/components/user/Table';
import { ActionHeader } from '@/components/ui/ActionHeader';
import { DeleteConfirmationDialog } from '@/components/ui/DeleteConfirmationDialog';
import { useUsers } from '@/hooks/user/useUsers';
import { useUserDialogs } from '@/hooks/user/useDialogs';
import { useUserMutations } from '@/hooks/user/useMutations';
import { CreateFormData, UpdateFormData } from '@/schema/user';
import { SortingState } from '@tanstack/react-table';
import { useState } from 'react';

export const UserManager = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const { data: users = [], isLoading } = useUsers({
    search: searchQuery,
    roles: selectedRoles,
    sorting:
      sorting.length > 0
        ? {
            field: sorting[0].id,
            order: sorting[0].desc ? 'desc' : 'asc',
          }
        : undefined,
  });

  const handleSearch = () => {
    setSearchQuery(searchValue);
  };

  const handleRoleFilter = (roles: string[]) => {
    setSelectedRoles(roles);
  };

  const {
    formDialog,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
  } = useUserDialogs();

  const { createMutation, updateMutation, deleteMutation } = useUserMutations();

  const handleSubmit = async (data: CreateFormData | UpdateFormData) => {
    if (formDialog.mode === 'add') {
      createMutation.mutate(data as CreateFormData);
    } else if (formDialog.user?.id) {
      updateMutation.mutate({ id: formDialog.user.id, data });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.user?.id) {
      deleteMutation.mutate(deleteDialog.user.id);
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
          label: 'Add New',
          onClick: openCreateDialog,
        }}
      />

      <TableUser
        data={users}
        isLoading={isLoading}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
        sorting={sorting}
        onSortingChange={setSorting}
        onRoleFilter={handleRoleFilter}
      />

      <FormUser
        open={formDialog.open}
        onClose={closeFormDialog}
        onSubmit={handleSubmit}
        user={formDialog.user}
        mode={formDialog.mode}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
        itemName={deleteDialog.user?.username || ''}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
