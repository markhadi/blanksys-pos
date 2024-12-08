import purchaseOrderData from '@/data/purchaseOrder.json';
import {
  PurchaseOrder,
  PurchaseOrderTableRow,
  toPurchaseOrderTableRow,
  PurchaseOrderSearchParams,
} from '@/types/purchaseOrder';

export const PurchaseOrderService = {
  fetchPurchaseOrders: async ({
    search,
    status,
    created_by,
    sorting,
  }: PurchaseOrderSearchParams = {}): Promise<PurchaseOrderTableRow[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let purchaseOrders = [...purchaseOrderData] as PurchaseOrder[];

    // Filter by search
    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      purchaseOrders = purchaseOrders.filter(
        (po) =>
          po.id_po.toLowerCase().includes(normalizedSearch) ||
          po.created_by.toLowerCase().includes(normalizedSearch)
      );
    }

    // Filter by status
    if (status?.length) {
      purchaseOrders = purchaseOrders.filter((po) =>
        status.includes(po.status)
      );
    }

    // Filter by created_by
    if (created_by && created_by.length > 0) {
      purchaseOrders = purchaseOrders.filter((po) =>
        created_by.includes(po.created_by)
      );
    }

    // Convert to table format
    let tableRows = purchaseOrders.map(toPurchaseOrderTableRow);

    // Apply sorting
    if (sorting) {
      const { field, order } = sorting;
      tableRows.sort((a, b) => {
        const aValue = String(a[field]);
        const bValue = String(b[field]);
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return tableRows;
  },

  createPurchaseOrder: async (data: PurchaseOrder): Promise<PurchaseOrder> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    purchaseOrderData.push(data);
    return data;
  },
};
