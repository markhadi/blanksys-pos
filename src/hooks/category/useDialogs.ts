import { Category as CategoryType } from '@/types/category';
import { useState } from 'react';

export const useCategoryDialogs = () => {
  const [formDialog, setFormDialog] = useState({
    open: false,
    mode: 'add' as 'add' | 'edit',
    category: undefined as CategoryType | undefined,
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    category: undefined as CategoryType | undefined,
  });
  const openCreateDialog = () => {
    setFormDialog({ open: true, mode: 'add', category: undefined });
  };
  const openEditDialog = (category: CategoryType) => {
    setFormDialog({ open: true, mode: 'edit', category });
  };
  const openDeleteDialog = (category: CategoryType) => {
    setDeleteDialog({ open: true, category });
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
        category: undefined,
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
