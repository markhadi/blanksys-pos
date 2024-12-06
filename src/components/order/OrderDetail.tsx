import { ArrowLeft, Edit, Printer, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OrderDetail = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-14">
        <button className="p-2 rounded-full bg-[#F8FAFC]">
          <ArrowLeft />
        </button>
        <h2 className="text-[20px] leading-[28px] font-bold">Order Details</h2>
        <span className="text-[#475569] text-[20px] leading-[28px]">
          TRX-2412010010
        </span>
      </div>

      <div className="flex flex-col gap-2 border-b border-[#CBD5E1] pb-3 mb-12">
        <div>
          <h4 className="text-[#475569] font-semibold text-[20px] leading-[28px]">
            Name
          </h4>
          <p className="text-[#121212] font-semibold text-[24px] leading-[32px]">
            John Doe
          </p>
        </div>
        <div>
          <h4 className="text-[#475569] font-semibold text-[20px] leading-[28px]">
            Note
          </h4>
          <p className="text-[#121212] text-[20px] leading-[28px]">
            Regular purchase
          </p>
        </div>
      </div>

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

          <div className="flex flex-col gap-2 border-b border-[#CBD5E1] pb-3 mb-3 max-h-40 overflow-y-auto">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-poppins font-bold text-[18px]">
                  MamyPoko Pants M34
                </p>
                <span className="text-[#475569] text-[16px] font-poppins">
                  $18 x 1
                </span>
              </div>
              <p className="text-[#0F172A] font-poppins text-[20px]">$18</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-poppins font-bold text-[18px]">
                  Roti Tawar Sari Roti
                </p>
                <span className="text-[#475569] text-[16px] font-poppins">
                  $1.5 x 1
                </span>
              </div>
              <p className="text-[#0F172A] font-poppins text-[20px]">$1.5</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-poppins font-bold text-[18px]">
                  Oreo Sandwich Coklat
                </p>
                <span className="text-[#475569] text-[16px] font-poppins">
                  $0.8 x 1
                </span>
              </div>
              <p className="text-[#0F172A] font-poppins text-[20px]">$0.8</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-poppins font-bold text-[18px]">
                  So Klin Liquid 1.8L
                </p>
                <span className="text-[#475569] text-[16px] font-poppins">
                  $3.5 x 1
                </span>
              </div>
              <p className="text-[#0F172A] font-poppins text-[20px]">$3.5</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-poppins font-bold text-[18px]">
                  Nugget Ayam So Good 500g
                </p>
                <span className="text-[#475569] text-[16px] font-poppins">
                  $4.2 x 1
                </span>
              </div>
              <p className="text-[#0F172A] font-poppins text-[20px]">$4.2</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-poppins font-bold text-[18px]">
                  Milo Sachet 35g
                </p>
                <span className="text-[#475569] text-[16px] font-poppins">
                  $0.15 x 1
                </span>
              </div>
              <p className="text-[#0F172A] font-poppins text-[20px]">$0.15</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="font-poppins font-bold text-[18px]">Total</p>
              <p className="font-poppins font-bold text-[20px]">$28.15</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-poppins font-bold text-[18px]">Discount</p>
              <p className="font-poppins text-[20px]">0%</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-poppins font-bold text-[18px]">Cut Price</p>
              <p className="font-poppins text-[20px]">$0</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-poppins font-bold text-[18px]">TAX</p>
                <span className="text-[#475569] text-[16px] font-poppins">
                  PPN 11%
                </span>
              </div>
              <p className="font-poppins text-[20px]">$3.1</p>
            </div>
            <div className="flex justify-between items-center border-b border-[#CBD5E1] pb-3">
              <p className="font-poppins font-bold text-[18px]">SUBTOTAL</p>
              <p className="font-poppins font-bold text-[20px]">$31.25</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 flex-wrap lg:flex-nowrap">
          <Button
            variant="outline"
            className="w-full font-inter text-[20px] h-max lg:h-14 font-medium text-[#EF4444] border-[#EF4444] hover:bg-[#EF4444] hover:text-white"
            onClick={() => {}}
            type="button"
            disabled={false}
          >
            <Trash2 className="mr-2" />
            Delete
          </Button>
          <Button
            variant="outline"
            className="w-full font-inter text-[20px] h-max lg:h-14 font-medium"
            onClick={() => {}}
            type="button"
            disabled={false}
          >
            <Edit className="mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            className="w-full font-inter text-[20px] h-max lg:h-14 font-medium"
            onClick={() => {}}
            type="button"
            disabled={false}
          >
            <Printer className="mr-2" />
            Print
          </Button>
          <Button
            className="w-full font-inter text-[20px] h-max lg:h-14 font-bold"
            onClick={() => {}}
            type="button"
            disabled={false}
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};
