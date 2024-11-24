interface StatusBadgeProps {
  status: 'complete' | 'cancel';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const bgColor = status === 'complete' ? 'bg-[#00B69B]' : 'bg-[#EF4444]';

  return (
    <span
      className={`py-1 px-3 w-[76px] flex-shrink-0 flex items-center justify-center ${bgColor} rounded-full`}
    >
      <span className="font-inter text-[12px] leading-[15px] text-[#FFFFFF] capitalize">
        {status}
      </span>
    </span>
  );
};
