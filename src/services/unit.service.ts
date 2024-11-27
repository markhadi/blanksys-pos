import { UnitSearchParams, UnitType } from '@/types/unit';
import unitData from '@/data/unit.json';
import { CreateFormData, UpdateFormData } from '@/schema/unit';

export const UnitService = {
  fetchUnits: async ({ search, sorting }: UnitSearchParams = {}): Promise<
    UnitType[]
  > => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let units = [...unitData] as UnitType[];

    if (search?.trim()) {
      const normalizedSearch = search.toLowerCase().trim();
      units = units.filter((unit) =>
        unit.unitName.toLowerCase().includes(normalizedSearch)
      );
    }

    if (sorting) {
      const { field, order } = sorting;
      units.sort((a, b) => {
        const aValue = String(a[field as keyof UnitType]);
        const bValue = String(b[field as keyof UnitType]);
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    return units;
  },

  createUnit: async (data: CreateFormData): Promise<UnitType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUnit: UnitType = {
      id: Math.max(...unitData.map((u) => u.id)) + 1,
      unitName: data.unitName,
      qty: data.qty,
    };

    unitData.push(newUnit);
    return newUnit;
  },

  updateUnit: async (id: number, data: UpdateFormData): Promise<UnitType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = unitData.findIndex((unit) => unit.id === id);
    if (index === -1) {
      throw new Error('Unit not found');
    }

    const updatedUnit: UnitType = {
      ...unitData[index],
      ...data,
    };

    unitData[index] = updatedUnit;
    return updatedUnit;
  },

  deleteUnit: async (id: number): Promise<UnitType> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = unitData.findIndex((unit) => unit.id === id);
    if (index === -1) {
      throw new Error('Unit not found');
    }

    const deletedUnit = unitData[index];
    unitData.splice(index, 1);
    return deletedUnit;
  },
};
