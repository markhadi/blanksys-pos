import { SupplierSearchParams, SupplierType } from '@/types/supplier';
import supplierData from '@/data/supplier.json';
import { CreateFormData, UpdateFormData } from '@/schema/supplier';

export const SupplierService = {
  fetchSuppliers: async ({
    search,
    sorting,
  }: SupplierSearchParams = {}): Promise<SupplierType[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let suppliers = [...supplierData] as SupplierType[];

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      suppliers = suppliers.filter((supplier) =>
        supplier.supplierName.toLowerCase().includes(normalizedSearch)
      );
    }

    if (sorting) {
      const { field, order } = sorting;
      suppliers.sort((a, b) => {
        const aValue = String(a[field as keyof SupplierType]);
        const bValue = String(b[field as keyof SupplierType]);
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return suppliers;
  },

  createSupplier: async (data: CreateFormData): Promise<SupplierType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newSupplier: SupplierType = {
      id: Math.max(...supplierData.map((s) => s.id)) + 1,
      ...data,
    };

    supplierData.push(newSupplier);

    return newSupplier;
  },

  updateSupplier: async (
    id: number,
    data: UpdateFormData
  ): Promise<SupplierType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = supplierData.findIndex((supplier) => supplier.id === id);
    if (index === -1) {
      throw new Error('Supplier not found');
    }

    const updatedSupplier = {
      ...supplierData[index],
      ...data,
    };

    supplierData[index] = updatedSupplier;
    return updatedSupplier;
  },

  deleteSupplier: async (id: number): Promise<SupplierType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = supplierData.findIndex((supplier) => supplier.id === id);
    if (index === -1) {
      throw new Error('Supplier not found');
    }

    const deletedSupplier = supplierData[index] as SupplierType;
    supplierData.splice(index, 1);
    return deletedSupplier;
  },
};
