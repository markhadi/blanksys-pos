export const DashboardCardSkeleton = () => (
  <div className="flex flex-grow flex-col gap-1 sm:gap-[34px] px-5 py-[15px] bg-white rounded-[16px] shadow-md min-w-[248px] animate-pulse">
    <div className="h-[72px] flex justify-between items-center">
      <div className="space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-32 bg-gray-200 rounded" />
      </div>
      <div className="w-[72px] h-[72px] bg-gray-200 rounded" />
    </div>
    <div className="flex gap-6">
      <div className="h-6 w-6 bg-gray-200 rounded" />
      <div className="h-6 w-32 bg-gray-200 rounded" />
    </div>
  </div>
);
