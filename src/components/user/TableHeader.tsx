import { UserType } from '@/types/user';
import { Icon } from '@iconify/react';
import { Column } from '@tanstack/react-table';
import { FilterPopover } from '@/components/ui/FilterPopover';
import { useRoles } from '@/hooks/user/useUsers';

export const UsernameHeader = ({ column }: { column: Column<UserType> }) => (
  <button
    className="min-w-60 xl:min-w-[500px] flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => column.toggleSorting()}
  >
    <span>USERNAME</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const FullNameHeader = ({ column }: { column: Column<UserType> }) => (
  <button
    className="min-w-60 xl:min-w-[500px] flex-shrink-0 flex items-center gap-2 justify-between w-full"
    onClick={() => column.toggleSorting()}
  >
    <span>FULL NAME</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);

export const RoleHeader = ({
  column,
  onRoleFilter,
}: {
  column: Column<UserType>;
  onRoleFilter: (roles: string[]) => void;
}) => {
  const { data: roles = [] } = useRoles('');

  return (
    <div className="min-w-[150px] flex-shrink-0 flex items-center gap-2">
      <FilterPopover
        title="ROLE"
        column={column}
        options={roles}
        onFIlter={onRoleFilter}
      />
    </div>
  );
};
