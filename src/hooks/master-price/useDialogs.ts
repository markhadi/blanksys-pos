import { MasterPrice } from '@/types/master-price';
import { useState } from 'react';

export const useMasterPriceDialogs = () => {
  const [formDialog, setFormDialog] = useState({
    open: false,
    mode: 'add' as 'add' | 'edit' | 'detail',
    masterPrice: undefined as MasterPrice | undefined,
  });

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    masterPrice: undefined as MasterPrice | undefined,
  });

  const openCreateDialog = () => {
    setFormDialog({ open: true, mode: 'add', masterPrice: undefined });
  };

  const openDetailDialog = (masterPrice: MasterPrice) => {
    setFormDialog({ open: true, mode: 'detail', masterPrice });
  };

  const openEditDialog = (masterPrice: MasterPrice) => {
    setFormDialog({ open: true, mode: 'edit', masterPrice });
  };

  const openDeleteDialog = (masterPrice: MasterPrice) => {
    setDeleteDialog({ open: true, masterPrice });
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
        masterPrice: undefined,
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
