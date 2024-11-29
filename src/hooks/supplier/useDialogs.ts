import { SupplierType } from '@/types/supplier';
import { useState } from 'react';

export const useSupplierDialogs = () => {
  const [formDialog, setFormDialog] = useState({
    open: false,
    mode: 'add' as 'add' | 'edit',
    supplier: undefined as SupplierType | undefined,
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    supplier: undefined as SupplierType | undefined,
  });
  const openCreateDialog = () => {
    setFormDialog({ open: true, mode: 'add', supplier: undefined });
  };
  const openEditDialog = (supplier: SupplierType) => {
    setFormDialog({ open: true, mode: 'edit', supplier });
  };
  const openDeleteDialog = (supplier: SupplierType) => {
    setDeleteDialog({ open: true, supplier });
  };
  const closeFormDialog = () => {
    setTimeout(() => {
      setFormDialog((prev) => ({ ...prev, open: false }));
    }, 300);
  };
  const closeDeleteDialog = () => {
    setTimeout(() => {
      setDeleteDialog((prev) => ({ ...prev, open: false }));
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
