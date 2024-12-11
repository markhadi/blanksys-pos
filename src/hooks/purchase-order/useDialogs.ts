import { PurchaseOrder } from '@/types/purchaseOrder';
import { useState } from 'react';

export const usePurchaseOrderDialogs = () => {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    purchaseOrder: undefined as PurchaseOrder | undefined,
  });

  const openDeleteDialog = (purchaseOrder: PurchaseOrder) => {
    setDeleteDialog({ open: true, purchaseOrder });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, purchaseOrder: undefined });
  };

  return {
    deleteDialog,
    openDeleteDialog,
    closeDeleteDialog,
  };
};
