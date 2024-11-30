import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@iconify/react';

interface RowActionProps {
  onEdit: () => void;
  onDelete: () => void;
  onView?: () => void;
}

export const RowAction = ({ onEdit, onDelete, onView }: RowActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 data-[state=open]:bg-muted focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Icon icon="mage:dots" className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={onView}>
            <Icon icon="solar:eye-outline" className="mr-2 h-4 w-4" />
            Detail
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onEdit}>
          <Icon icon="solar:pen-2-linear" className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          <Icon icon="solar:trash-bin-trash-linear" className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
