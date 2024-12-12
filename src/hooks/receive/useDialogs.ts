import { Receive } from '@/types/receive';
import { useState } from 'react';

export const useReceiveDialogs = () => {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    receive: undefined as Receive | undefined,
  });

  const openDeleteDialog = (receive: Receive) => {
    setDeleteDialog({ open: true, receive });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, receive: undefined });
  };

  return {
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
  };
};
