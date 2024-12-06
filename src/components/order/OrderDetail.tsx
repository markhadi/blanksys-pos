import { ArrowLeft, Edit, Printer, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummary {
  subtotal: number;
  discount: number;
  cutPrice: number;
  tax: number;
  total: number;
}

interface OrderDetailProps {
  orderId: string;
  customerName: string;
  note: string;
  items: OrderItem[];
  summary: OrderSummary;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPrint: () => void;
  onComplete: () => void;
}

const OrderHeader = ({
  orderId,
  customerName,
  note,
}: Pick<OrderDetailProps, 'orderId' | 'customerName' | 'note'>) => (
  <>
    <div className="flex items-center gap-2 mb-14">
      <button className="p-2 rounded-full bg-[#F8FAFC]">
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

const OrderItemList = ({ items }: { items: OrderItem[] }) => (
  <div className="flex flex-col gap-2 border-b border-[#CBD5E1] pb-3 mb-3 max-h-40 overflow-y-auto">
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

const OrderSummarySection = ({ summary }: { summary: OrderSummary }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <p className="font-poppins font-bold text-[18px]">Total</p>
      <p className="font-poppins font-bold text-[20px]">
        ${summary.subtotal.toFixed(2)}
      </p>
    </div>
    <div className="flex justify-between items-center">
      <p className="font-poppins font-bold text-[18px]">Discount</p>
      <p className="font-poppins text-[20px]">{summary.discount}%</p>
    </div>
    <div className="flex justify-between items-center">
      <p className="font-poppins font-bold text-[18px]">Cut Price</p>
      <p className="font-poppins text-[20px]">${summary.cutPrice.toFixed(2)}</p>
    </div>
    <div className="flex justify-between items-center">
      <div>
        <p className="font-poppins font-bold text-[18px]">TAX</p>
        <span className="text-[#475569] text-[16px] font-poppins">PPN 11%</span>
      </div>
      <p className="font-poppins text-[20px]">${summary.tax.toFixed(2)}</p>
    </div>
    <div className="flex justify-between items-center border-b border-[#CBD5E1] pb-3">
      <p className="font-poppins font-bold text-[18px]">SUBTOTAL</p>
      <p className="font-poppins font-bold text-[20px]">
        ${summary.total.toFixed(2)}
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

export const OrderDetail = (props: OrderDetailProps) => {
  return (
    <div className="flex flex-col h-full">
      <OrderHeader
        orderId={props.orderId}
        customerName={props.customerName}
        note={props.note}
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

          <OrderItemList items={props.items} />
          <OrderSummarySection summary={props.summary} />
        </div>

        <ActionButtons
          onDelete={props.onDelete}
          onEdit={props.onEdit}
          onPrint={props.onPrint}
          onComplete={props.onComplete}
        />
      </div>
    </div>
  );
};
