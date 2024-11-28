import { UserType } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { FullNameHeader, RoleHeader, UsernameHeader } from './TableHeader';
import { RowAction } from '@/components/ui/RowAction';

export const createColumns = (
  onEdit: (user: UserType) => void,
  onDelete: (user: UserType) => void
): ColumnDef<UserType>[] => [
  {
    id: 'username',
    accessorKey: 'username',
    header: ({ column }) => <UsernameHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-60 xl:min-w-[500px] flex-shrink-0">
        {getValue() as string}
      </span>
    ),
  },
  {
    id: 'fullName',
    accessorKey: 'fullName',
    header: ({ column }) => <FullNameHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-60 xl:min-w-[500px] flex-shrink-0">
        {getValue() as string}
      </span>
    ),
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: ({ column }) => <RoleHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-[150px] flex-shrink-0">
        {getValue() as string}
      </span>
    ),
  },
  {
    id: 'action',
    accessorKey: 'action',
    header: () => <span className="w-[77px]">ACTION</span>,
    cell: ({ row }) => (
      <div className="w-[77px] flex justify-center">
        <RowAction
          onEdit={() => onEdit(row.original)}
          onDelete={() => onDelete(row.original)}
        />
      </div>
    ),
  },
];
