import { TableCardProps } from '@/types/dashboard';

export const TableCard = ({ title, children }: TableCardProps) => {
  return (
    <div className="bg-white flex flex-col gap-[45px] px-[22px] py-[37px] rounded-[12px] shadow-md max-h-max">
      <h3 className="font-inter font-bold text-[#202224] text-[18px] sm:text-[24px] leading-[20px]">
        {title}
      </h3>
      {children}
    </div>
  );
};
