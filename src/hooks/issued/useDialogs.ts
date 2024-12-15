import { Issued } from '@/types/issued';
import { useState } from 'react';

export const useIssuedDialogs = () => {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    issued: undefined as Issued | undefined,
  });

  const openDeleteDialog = (issued: Issued) => {
    setDeleteDialog({ open: true, issued });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, issued: undefined });
  };

  return {
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
  };
};
