import { Button } from './button';
import { Loader2 } from 'lucide-react';

interface FormActionsProps {
  mode: 'add' | 'edit' | 'detail';
  isLoading?: boolean;
  onCancel: () => void;
  className?: string;
}

export const FormActions = ({
  mode,
  isLoading = false,
  onCancel,
}: FormActionsProps) => {
  const getButtonText = () => {
    if (isLoading) {
      return mode === 'add' ? 'Adding...' : 'Updating...';
    }
    return mode === 'add' ? 'Add' : 'Update';
  };

  if (mode === 'detail') {
    return (
      <div className="flex justify-end gap-5 sm:gap-10">
        <Button
          type="button"
          className="w-full flex items-center justify-center"
          onClick={onCancel}
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-5 sm:gap-10">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
        className="w-full text-[#64748B]"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {getButtonText()}
      </Button>
    </div>
  );
};
