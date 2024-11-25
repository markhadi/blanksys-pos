import { Icon } from '@iconify/react';

export const CategoryNameHeader = () => (
  <button
    className="min-w-[110px] flex-shrink-0 flex-grow flex items-center gap-2"
    onClick={() => {
      console.log('sort');
    }}
  >
    <span>CATEGORY NAME</span>
    <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
  </button>
);
