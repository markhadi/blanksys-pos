import issuedData from '@/data/issued.json';
import {
  Issued,
  IssuedTableRow,
  toIssuedTableRow,
  IssuedSearchParams,
} from '@/types/issued';

export const IssuedService = {
  fetchIssued: async ({
    search,
    issuedBy,
    sorting,
    id,
  }: IssuedSearchParams = {}): Promise<IssuedTableRow[] | Issued> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return single issued if id is provided
    if (id) {
      return issuedData.find((issued) => issued.id === id) as Issued;
    }

    let issueds = [...issuedData] as Issued[];

    // Filter by search
    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      issueds = issueds.filter(
        (issued) =>
          issued.id.toLowerCase().includes(normalizedSearch) ||
          issued.issuedBy.toLowerCase().includes(normalizedSearch) ||
          issued.items.some(
            (item) =>
              item.itemName.toLowerCase().includes(normalizedSearch) ||
              item.category.toLowerCase().includes(normalizedSearch) ||
              item.brand.toLowerCase().includes(normalizedSearch)
          )
      );
    }

    // Filter by issuedBy
    if (issuedBy && issuedBy.length > 0) {
      issueds = issueds.filter((issued) => issuedBy.includes(issued.issuedBy));
    }

    // Convert to table format
    const tableRows = issueds.map(toIssuedTableRow);

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

  createIssued: async (data: Issued): Promise<Issued> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    issuedData.push(data);
    return data;
  },

  deleteIssued: async (id: string): Promise<Issued> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = issuedData.findIndex((issued) => issued.id === id);
    if (index === -1) {
      throw new Error('Issued record not found');
    }

    const deletedIssued = issuedData[index] as Issued;
    issuedData.splice(index, 1);
    return deletedIssued;
  },

  updateIssued: async (data: Issued): Promise<Issued> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = issuedData.findIndex((issued) => issued.id === data.id);
    if (index === -1) throw new Error('Issued record not found');
    issuedData[index] = data;
    return data;
  },
};
