import { Icon } from '@iconify/react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  className?: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-8 px-4 text-center w-full">
    <Icon
      icon="solar:box-minimalistic-broken"
      className="w-16 h-16 text-gray-300 mb-3"
    />
    <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
    {description && <p className="text-sm text-gray-500">{description}</p>}
  </div>
);
