import { BrandType } from '@/types/brand';
import { useState } from 'react';

export const useBrandDialogs = () => {
  const [formDialog, setFormDialog] = useState({
    open: false,
    mode: 'add' as 'add' | 'edit',
    brand: undefined as BrandType | undefined,
  });
  const openCreateDialog = () => {
    setFormDialog({ open: true, mode: 'add', brand: undefined });
  };
  const openEditDialog = (brand: BrandType) => {
    setFormDialog({ open: true, mode: 'edit', brand });
  };
  const closeFormDialog = () => {
    setTimeout(() => {
      setFormDialog((prev) => ({ ...prev, open: false }));
    }, 300);
  };
  return {
    formDialog,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  };
};
