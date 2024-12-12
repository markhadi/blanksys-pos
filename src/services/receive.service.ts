import receiveData from '@/data/receive.json';
import {
  Receive,
  ReceiveTableRow,
  toReceiveTableRow,
  ReceiveSearchParams,
} from '@/types/receive';

export const ReceiveService = {
  fetchReceives: async ({
    search,
    receive_by,
    supplier_name,
    sorting,
    id_receive,
    id_po,
  }: ReceiveSearchParams = {}): Promise<ReceiveTableRow[] | Receive> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return single receive if id_receive is provided
    if (id_receive) {
      return receiveData.find(
        (receive) => receive.id_receive === id_receive
      ) as Receive;
    }

    // Return receive by PO if id_po is provided
    if (id_po) {
      return receiveData.find((receive) => receive.id_po === id_po) as Receive;
    }

    let receives = [...receiveData] as Receive[];

    // Filter by search
    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      receives = receives.filter(
        (receive) =>
          receive.id_receive.toLowerCase().includes(normalizedSearch) ||
          receive.id_po.toLowerCase().includes(normalizedSearch) ||
          receive.supplier_name.toLowerCase().includes(normalizedSearch) ||
          receive.receive_by.toLowerCase().includes(normalizedSearch)
      );
    }

    // Filter by receive_by
    if (receive_by && receive_by.length > 0) {
      receives = receives.filter((receive) =>
        receive_by.includes(receive.receive_by)
      );
    }

    // Filter by supplier_name
    if (supplier_name && supplier_name.length > 0) {
      receives = receives.filter((receive) =>
        supplier_name.includes(receive.supplier_name)
      );
    }

    // Convert to table format
    const tableRows = receives.map(toReceiveTableRow);

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

  createReceive: async (data: Receive): Promise<Receive> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    receiveData.push(data);
    return data;
  },

  deleteReceive: async (id: string): Promise<Receive> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = receiveData.findIndex((receive) => receive.id_receive === id);
    if (index === -1) {
      throw new Error('Receive record not found');
    }

    const deletedReceive = receiveData[index] as Receive;
    receiveData.splice(index, 1);
    return deletedReceive;
  },

  updateReceive: async (data: Receive): Promise<Receive> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = receiveData.findIndex(
      (receive) => receive.id_receive === data.id_receive
    );
    if (index === -1) throw new Error('Receive record not found');
    receiveData[index] = data;
    return data;
  },
};
