import { Search } from '@/components/ui/search';
import { Button } from '@/components/ui/button';
import '@/styles/button.css';

interface ActionHeaderProps {
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  searchProps: {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
  };
}

export const ActionHeader = ({
  actionButton,
  searchProps,
}: ActionHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <Search {...searchProps} />
      {actionButton && (
        <Button onClick={actionButton.onClick} className="add-new-button">
          {actionButton.label}
        </Button>
      )}
    </div>
  );
};
