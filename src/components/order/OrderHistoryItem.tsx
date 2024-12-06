import { OrderHistory } from '@/types/order';

interface OrderHistoryItemProps {
  order: OrderHistory;
  onClick: (order: OrderHistory) => void;
}

export const OrderHistoryItem = ({ order, onClick }: OrderHistoryItemProps) => {
  const initials = order.customerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const formattedTotal = (order.total || 0).toLocaleString();

  return (
    <button
      role="button"
      onClick={() => onClick(order)}
      className="flex items-start gap-2 sm:items-center justify-between border-b border-[#94A3B8] py-2 flex-col sm:flex-row w-full hover:bg-gray-50"
    >
      <div className="flex items-center gap-5">
        <span className="h-12 w-12 grid place-content-center rounded-full bg-[#475569] text-white text-[20px] leading-[28px] font-semibold">
          {initials}
        </span>
        <div className="flex flex-col items-start">
          <h3 className="text-[20px] leading-[28px] font-semibold">
            {order.customerName}
          </h3>
          <p className="text-[#475569] leading-[28px]">{order.transactionId}</p>
        </div>
      </div>
      <span className="font-bold text-[#475569] text-right w-full sm:w-max">
        $ {formattedTotal}
      </span>
    </button>
  );
};
