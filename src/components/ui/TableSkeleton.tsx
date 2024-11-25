import { Skeleton } from '@/components/ui/skeleton';

interface TableSkeletonProps {
  rows: number;
  rowHeight?: number;
}

export const TableSkeleton = ({ rows, rowHeight = 44 }: TableSkeletonProps) => {
  return (
    <div className="space-y-3">
      <div className="flex gap-4 px-6 py-3">
        <Skeleton className="h-6 flex-1" />
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex gap-4 px-6"
          style={{ height: `${rowHeight}px` }}
        >
          <Skeleton className="h-8 flex-1" />
        </div>
      ))}
    </div>
  );
};
