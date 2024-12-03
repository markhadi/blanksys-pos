import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { MasterPrice } from '@/types/master-price';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { FilterPopover } from '@/components/ui/FilterPopover';

export const IdHeader = () => <span className="min-w-[164px] flex">ID</span>;

export const ItemNameHeader = ({ column }: { column: Column<MasterPrice> }) => (
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
  column: Column<MasterPrice>;
  onCategoryFilter: (categories: string[]) => void;
}) => {
  const { data: masterItems = [] } = useMasterItems({});

  const categoryOptions = Array.from(
    new Set(masterItems.map((item) => item.category))
  ).sort();

  return (
    <div className="min-w-80 flex-shrink-0 flex items-center gap-2">
      <FilterPopover
        column={column}
        title="CATEGORY"
        options={categoryOptions}
        onFilter={onCategoryFilter}
      />
    </div>
  );
};

export const BrandHeader = ({
  column,
  onBrandFilter,
}: {
  column: Column<MasterPrice>;
  onBrandFilter: (brands: string[]) => void;
}) => {
  const { data: masterItems = [] } = useMasterItems({});

  const brandOptions = Array.from(
    new Set(masterItems.map((item) => item.brand))
  ).sort();

  return (
    <div className="min-w-80 flex-shrink-0 flex items-center gap-2">
      <FilterPopover
        column={column}
        title="BRAND"
        options={brandOptions}
        onFilter={onBrandFilter}
      />
    </div>
  );
};

export const CapitalPriceHeader = ({
  column,
}: {
  column: Column<MasterPrice>;
}) => (
  <button
    className="min-w-48 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>CAPITAL PRICE</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const SellingPriceHeader = ({
  column,
}: {
  column: Column<MasterPrice>;
}) => (
  <button
    className="min-w-48 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>SELLING PRICE</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const StockHeader = ({ column }: { column: Column<MasterPrice> }) => (
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

export const UnitHeader = ({ column }: { column: Column<MasterPrice> }) => (
  <button
    className="min-w-32 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => {
      column.toggleSorting();
    }}
  >
    <span>UNIT</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);
