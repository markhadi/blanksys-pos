import { MasterItem } from '@/types/master-item';
import { useState } from 'react';

export const useMasterItemDialogs = () => {
  const [formDialog, setFormDialog] = useState({
    open: false,
    mode: 'add' as 'add' | 'edit' | 'detail',
    masterItem: undefined as MasterItem | undefined,
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    masterItem: undefined as MasterItem | undefined,
  });
  const openCreateDialog = () => {
    setFormDialog({ open: true, mode: 'add', masterItem: undefined });
  };
  const openDetailDialog = (masterItem: MasterItem) => {
    setFormDialog({ open: true, mode: 'detail', masterItem });
  };
  const openEditDialog = (masterItem: MasterItem) => {
    setFormDialog({ open: true, mode: 'edit', masterItem });
  };
  const openDeleteDialog = (masterItem: MasterItem) => {
    setDeleteDialog({ open: true, masterItem });
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
        masterItem: undefined,
      }));
    }, 300);
  };
  return {
    formDialog,
    deleteDialog,
    openCreateDialog,
    openDetailDialog,
    openEditDialog,
    openDeleteDialog,
    closeFormDialog,
    closeDeleteDialog,
  };
};
