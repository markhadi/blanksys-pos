import { Icon } from '@iconify/react';
import { CardData } from '@/types/dashboard';
import { formatNumber } from '@/lib/utils';
import { BOX_ICONS } from '@/constants/dashboard';

interface DashboardCardProps {
  data: CardData;
}

export const DashboardCard = ({ data }: DashboardCardProps) => {
  const { title, value, trend, type } = data;

  return (
    <div className="flex flex-grow flex-col gap-1 sm:gap-[34px] px-5 py-[15px] bg-white rounded-[16px] shadow-md min-w-[300px]">
      <div className="h-[72px] flex justify-between items-center">
        <div className="space-y-0 sm:space-y-3">
          <span className="text-[14px] sm:text-[16px] text-[#202224] font-semibold leading-[22px]">
            {title}
          </span>
          <h1 className="text-[20px] sm:text-[28px] text-[#202224] font-bold leading-[38px] tracking-[1px]">
            {title === 'Brand' ||
            title === 'Category' ||
            title === 'Price' ||
            title === 'Item'
              ? `${value}`
              : `$ ${formatNumber(value)}`}
          </h1>
        </div>
        <img
          src={BOX_ICONS[type]}
          alt={`${type} icon`}
          className="w-[48px] h-[48px] sm:w-[72px] sm:h-[72px]"
        />
      </div>
      <div className="flex gap-2 sm:gap-6">
        <Icon
          height={24}
          color={trend.isUp ? '#00B69B' : '#FF7878'}
          icon={`icon-park-outline:trending-${trend.isUp ? 'up' : 'down'}`}
        />
        <p className="text-[#606060] font-semibold text-[14px] sm:text-[16px] leading-[22px]">
          <span className={trend.isUp ? 'text-[#00B69B]' : 'text-[#FF7878]'}>
            {trend.value}%{' '}
          </span>
          {trend.text}
        </p>
      </div>
    </div>
  );
};
