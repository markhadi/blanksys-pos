import { Button } from '@/components/ui/button';

interface OrderItemProps {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const OrderItem = ({
  imageUrl,
  name,
  price,
  quantity,
  unit,
  onIncrement,
  onDecrement,
  onRemove,
}: OrderItemProps) => {
  const totalPrice = price * quantity;

  return (
    <div className="flex items-center gap-5 justify-between p-3 border-b border-[#DDDDDD]">
      <div className="flex items-center gap-5">
        <img
          src={imageUrl}
          alt={`Product image of ${name}`}
          height={46}
          width={46}
          className="rounded-md object-cover"
        />
        <div>
          <h3 className="text-[18px] font-bold">{name}</h3>
          <p className="text-[16px]">
            $ {price.toLocaleString()} / <span>{unit}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-[20px]">$ {totalPrice.toLocaleString()}</span>
        <div className="flex items-center gap-2 bg-[#F1F5F9] rounded-lg">
          <Button
            size="icon"
            className="max-h-[30px] max-w-[30px]"
            onClick={quantity === 1 ? onRemove : onDecrement}
          >
            -
          </Button>
          <span className="text-[20px] w-10 text-center">{quantity}</span>
          <Button
            size="icon"
            className="max-h-[30px] max-w-[30px]"
            onClick={onIncrement}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
