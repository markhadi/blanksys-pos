import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { ReceiveTableRow } from '@/types/receive';
import { FilterPopover } from '@/components/ui/FilterPopover';
import { useReceives } from '@/hooks/receive/useReceive';

export const IdHeader = () => (
  <span className="min-w-60 flex-shrink-0">RECEIVE ID</span>
);

export const DateHeader = ({ column }: { column: Column<ReceiveTableRow> }) => (
  <button
    className="min-w-64 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => column.toggleSorting()}
  >
    <span>DATE</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const SupplierHeader = ({
  column,
  onSupplierFilter,
}: {
  column: Column<ReceiveTableRow>;
  onSupplierFilter: (suppliers: string[]) => void;
}) => {
  const { data: receives = [] } = useReceives({});
  const uniqueSuppliers = Array.from(
    new Set(
      Array.isArray(receives)
        ? receives.map((receive) => receive.supplier_name)
        : []
    )
  ).sort();

  return (
    <div className="min-w-64 flex-shrink-0 flex flex-grow items-center gap-2 justify-between w-full">
      <FilterPopover
        title="SUPPLIER"
        column={column}
        options={uniqueSuppliers}
        onFilter={onSupplierFilter}
      />
    </div>
  );
};

export const ReceiverHeader = ({
  column,
  onReceiverFilter,
}: {
  column: Column<ReceiveTableRow>;
  onReceiverFilter: (receivers: string[]) => void;
}) => {
  const { data: receives = [] } = useReceives({});
  const uniqueReceivers = Array.from(
    new Set(
      Array.isArray(receives)
        ? receives.map((receive) => receive.receive_by)
        : []
    )
  );

  return (
    <div className="min-w-64 flex-shrink-0 flex flex-grow items-center gap-2 justify-between w-full">
      <FilterPopover
        title="RECEIVED BY"
        column={column}
        options={uniqueReceivers}
        onFilter={onReceiverFilter}
      />
    </div>
  );
};
