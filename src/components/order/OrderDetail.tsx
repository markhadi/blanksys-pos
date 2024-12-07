import { ArrowLeft, Edit, Printer, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderDetailProps, OrderItem, OrderSummary } from '@/types/order';

const OrderHeader = ({
  orderId,
  customerName,
  note,
  onBack,
}: Pick<OrderDetailProps, 'orderId' | 'customerName' | 'note' | 'onBack'>) => (
  <>
    <div className="flex items-center gap-2 mb-14 flex-wrap">
      <button onClick={onBack}>
        <ArrowLeft />
      </button>
      <h2 className="text-[20px] leading-[28px] font-bold">Order Details</h2>
      <span className="text-[#475569] text-[20px] leading-[28px]">
        {orderId}
      </span>
    </div>

    <div className="flex flex-col gap-2 border-b border-[#CBD5E1] pb-3 mb-12">
      <div>
        <h4 className="text-[#475569] font-semibold text-[20px] leading-[28px]">
          Name
        </h4>
        <p className="text-[#121212] font-semibold text-[24px] leading-[32px]">
          {customerName}
        </p>
      </div>
      <div>
        <h4 className="text-[#475569] font-semibold text-[20px] leading-[28px]">
          Note
        </h4>
        <p className="text-[#121212] text-[20px] leading-[28px]">{note}</p>
      </div>
    </div>
  </>
);

interface OrderItemListProps {
  items: OrderItem[];
  className?: string;
}

export const OrderItemList = ({ items, className }: OrderItemListProps) => (
  <div
    className={`flex flex-col gap-2 border-b border-[#CBD5E1] pb-3 mb-3 max-h-40 overflow-y-auto ${
      className || ''
    }`}
  >
    {items.map((item, index) => (
      <div key={index} className="flex justify-between items-center">
        <div>
          <p className="font-poppins font-bold text-[18px]">{item.name}</p>
          <span className="text-[#475569] text-[16px] font-poppins">
            ${item.price} x {item.quantity}
          </span>
        </div>
        <p className="text-[#0F172A] font-poppins text-[20px]">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    ))}
  </div>
);

export const OrderSummarySection = ({ summary }: { summary: OrderSummary }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <p className="font-poppins font-bold text-[18px]">Total</p>
      <p className="font-poppins font-bold text-[20px]">
        ${(summary?.total || 0).toFixed(2)}
      </p>
    </div>
    <div className="flex justify-between items-center">
      <p className="font-poppins font-bold text-[18px]">Discount</p>
      <p className="font-poppins text-[20px]">{summary?.discount || 0}%</p>
    </div>
    <div className="flex justify-between items-center">
      <p className="font-poppins font-bold text-[18px]">Cut Price</p>
      <p className="font-poppins text-[20px]">
        ${(summary?.cutPrice || 0).toFixed(2)}
      </p>
    </div>
    <div className="flex justify-between items-center">
      <div>
        <p className="font-poppins font-bold text-[18px]">TAX</p>
        <span className="text-[#475569] text-[16px] font-poppins">PPN 11%</span>
      </div>
      <p className="font-poppins text-[20px]">
        ${(summary?.tax || 0).toFixed(2)}
      </p>
    </div>
    <div className="flex justify-between items-center border-b border-[#CBD5E1] pb-3">
      <p className="font-poppins font-bold text-[18px]">SUBTOTAL</p>
      <p className="font-poppins font-bold text-[20px]">
        ${(summary?.subtotal || 0).toFixed(2)}
      </p>
    </div>
  </div>
);

const ActionButtons = ({
  onDelete,
  onEdit,
  onPrint,
  onComplete,
}: Pick<
  OrderDetailProps,
  'onDelete' | 'onEdit' | 'onPrint' | 'onComplete'
>) => (
  <div className="flex items-center justify-end gap-4 flex-wrap lg:flex-nowrap">
    <Button
      variant="outline"
      className="w-full font-inter text-[20px] h-max lg:h-14 font-medium text-[#EF4444] border-[#EF4444] hover:bg-[#EF4444] hover:text-white"
      onClick={onDelete}
    >
      <Trash2 className="mr-2" />
      Delete
    </Button>
    <Button
      variant="outline"
      className="w-full font-inter text-[20px] h-max lg:h-14 font-medium"
      onClick={onEdit}
    >
      <Edit className="mr-2" />
      Edit
    </Button>
    <Button
      variant="outline"
      className="w-full font-inter text-[20px] h-max lg:h-14 font-medium"
      onClick={onPrint}
    >
      <Printer className="mr-2" />
      Print
    </Button>
    <Button
      className="w-full font-inter text-[20px] h-max lg:h-14 font-bold"
      onClick={onComplete}
    >
      Complete
    </Button>
  </div>
);

export const OrderDetail = ({
  orderId,
  customerName,
  note,
  items,
  summary,
  onBack,
  onDelete,
  onEdit,
  onPrint,
  onComplete,
}: OrderDetailProps) => {
  return (
    <div className="flex flex-col h-full">
      <OrderHeader
        orderId={orderId}
        customerName={customerName}
        note={note}
        onBack={onBack}
      />

      <div className="flex flex-col gap-4 justify-between h-full">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[#475569] font-semibold text-[20px] leading-[28px]">
              Order Details
            </h3>
            <h3 className="text-[#475569] font-semibold text-[20px] leading-[28px] text-right">
              Total
            </h3>
          </div>

          <OrderItemList items={items} />
          <OrderSummarySection summary={summary} />
        </div>

        <ActionButtons
          onDelete={onDelete}
          onEdit={onEdit}
          onPrint={onPrint}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};
