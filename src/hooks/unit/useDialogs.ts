import { UnitType } from '@/types/unit';
import { useState } from 'react';

export const useUnitDialogs = () => {
  const [formDialog, setFormDialog] = useState({
    open: false,
    mode: 'add' as 'add' | 'edit',
    unit: undefined as UnitType | undefined,
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    unit: undefined as UnitType | undefined,
  });
  const openCreateDialog = () => {
    setFormDialog({ open: true, mode: 'add', unit: undefined });
  };
  const openEditDialog = (unit: UnitType) => {
    setFormDialog({ open: true, mode: 'edit', unit });
  };
  const openDeleteDialog = (unit: UnitType) => {
    setDeleteDialog({ open: true, unit });
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
        unit: undefined,
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
