import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { PurchaseOrderTableRow } from '@/types/purchaseOrder';
import { FilterPopover } from '@/components/ui/FilterPopover';
import { usePurchaseOrders } from '@/hooks/purchase-order/usePurchaseOrder';

export const IdHeader = () => (
  <span className="min-w-60 flex-shrink-0">PO ID</span>
);

export const DateHeader = ({
  column,
}: {
  column: Column<PurchaseOrderTableRow>;
}) => (
  <button
    className="min-w-64 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => column.toggleSorting()}
  >
    <span>DATE</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const CreatedByHeader = ({
  column,
  onCreatorFilter,
}: {
  column: Column<PurchaseOrderTableRow>;
  onCreatorFilter: (creators: string[]) => void;
}) => {
  const { data: statuses = [] } = usePurchaseOrders({});
  const uniqueCreators = Array.from(
    new Set(statuses.map((po) => po.created_by))
  );

  return (
    <div className="min-w-64 flex-shrink-0 flex flex-grow items-center gap-2 justify-between w-full">
      <FilterPopover
        title="CREATED BY"
        column={column}
        options={uniqueCreators}
        onFilter={onCreatorFilter}
      />
    </div>
  );
};

export const StatusHeader = ({
  column,
  onStatusFilter,
}: {
  column: Column<PurchaseOrderTableRow>;
  onStatusFilter: (statuses: string[]) => void;
}) => {
  const { data: statuses = [] } = usePurchaseOrders({});
  const uniqueStatuses = Array.from(new Set(statuses.map((po) => po.status)));

  return (
    <div className="min-w-56 flex-shrink-0 flex items-center gap-2">
      <FilterPopover
        title="STATUS"
        column={column}
        options={uniqueStatuses}
        onFilter={onStatusFilter}
      />
    </div>
  );
};
