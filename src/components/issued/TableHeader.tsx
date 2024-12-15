import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { IssuedTableRow } from '@/types/issued';
import { FilterPopover } from '@/components/ui/FilterPopover';
import { useIssued } from '@/hooks/issued/useIssued';

export const IdHeader = () => (
  <span className="min-w-60 flex-shrink-0">ISSUED ID</span>
);

export const DateHeader = ({ column }: { column: Column<IssuedTableRow> }) => (
  <button
    className="min-w-64 flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => column.toggleSorting()}
  >
    <span>DATE</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const IssuedByHeader = ({
  column,
  onIssuedByFilter,
}: {
  column: Column<IssuedTableRow>;
  onIssuedByFilter: (issuers: string[]) => void;
}) => {
  const { data: issueds = [] } = useIssued({});
  const uniqueIssuers = Array.from(
    new Set(
      Array.isArray(issueds) ? issueds.map((issued) => issued.issuedBy) : []
    )
  ).sort();

  return (
    <div className="min-w-64 flex-shrink-0 flex flex-grow items-center gap-2 justify-between w-full">
      <FilterPopover
        title="ISSUED BY"
        column={column}
        options={uniqueIssuers}
        onFilter={onIssuedByFilter}
      />
    </div>
  );
};
