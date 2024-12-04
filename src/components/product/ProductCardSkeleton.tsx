import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <article className="flex flex-grow flex-wrap items-center justify-between gap-5 p-3 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-5">
        {/* Image skeleton */}
        <Skeleton className="h-24 w-24 rounded-md" />

        <div className="flex flex-col gap-2">
          {/* Title skeleton */}
          <Skeleton className="h-7 w-48" />

          {/* Category and brand skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>

          {/* Stock status skeleton */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* Price skeleton */}
        <Skeleton className="h-7 w-24" />
        {/* Button skeleton */}
        <Skeleton className="h-10 w-20" />
      </div>
    </article>
  );
};
