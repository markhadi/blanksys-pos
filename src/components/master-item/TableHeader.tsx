import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { MasterItem } from '@/types/master-item';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { FilterPopover } from '@/components/ui/FilterPopover';

export const IdHeader = () => <span className="min-w-[164px] flex">ID</span>;

export const ItemNameHeader = ({ column }: { column: Column<MasterItem> }) => (
  <button
    className="min-w-[400px] flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>ITEM NAME</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const CategoryHeader = ({
  column,
  onCategoryFilter,
}: {
  column: Column<MasterItem>;
  onCategoryFilter: (categories: string[]) => void;
}) => {
  const { data: masterItems = [] } = useMasterItems({});
  const categories = Array.from(
    new Set(masterItems.map((item) => item.category))
  ).sort();

  return (
    <div className="min-w-64 flex-shrink-0 flex items-center gap-2">
      <FilterPopover
        column={column}
        title="CATEGORY"
        options={categories}
        onFilter={onCategoryFilter}
      />
    </div>
  );
};

export const BrandHeader = ({
  column,
  onBrandFilter,
}: {
  column: Column<MasterItem>;
  onBrandFilter: (brands: string[]) => void;
}) => {
  const { data: masterItems = [] } = useMasterItems({});
  const brands = Array.from(
    new Set(masterItems.map((item) => item.brand))
  ).sort();

  return (
    <div className="min-w-80 flex-shrink-0 flex items-center gap-2">
      <FilterPopover
        column={column}
        title="BRAND"
        options={brands}
        onFilter={onBrandFilter}
      />
    </div>
  );
};

export const CapitalPriceHeader = ({
  column,
}: {
  column: Column<MasterItem>;
}) => (
  <button
    className="min-w-72 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>CAPITAL PRICE</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const StockHeader = ({ column }: { column: Column<MasterItem> }) => (
  <button
    className="min-w-48 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>STOCK</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);
