import { UserType } from '@/types/user';
import { useState } from 'react';

export const useUserDialogs = () => {
  const [formDialog, setFormDialog] = useState({
    open: false,
    mode: 'add' as 'add' | 'edit',
    user: undefined as UserType | undefined,
  });

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    user: undefined as UserType | undefined,
  });

  const openCreateDialog = () => {
    setFormDialog({ open: true, mode: 'add', user: undefined });
  };

  const openEditDialog = (user: UserType) => {
    setFormDialog({ open: true, mode: 'edit', user });
  };

  const openDeleteDialog = (user: UserType) => {
    setDeleteDialog({ open: true, user });
  };

  const closeFormDialog = () => {
    setTimeout(() => {
      setFormDialog((prev) => ({ ...prev, open: false }));
    }, 300);
  };

  const closeDeleteDialog = () => {
    setTimeout(() => {
      setDeleteDialog((prev) => ({
        ...prev,
        open: false,
        user: undefined,
      }));
    }, 300);
  };

  return {
    formDialog,
    deleteDialog,
    openCreateDialog,
    openEditDialog,
    openDeleteDialog,
    closeFormDialog,
    closeDeleteDialog,
  };
};
