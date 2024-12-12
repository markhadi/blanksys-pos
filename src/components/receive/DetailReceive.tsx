import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ReceiveTableRow } from '@/types/receive';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useSupplier } from '@/hooks/supplier/useSupplier';

export const DetailReceive = ({
  open,
  onClose,
  receive,
}: {
  open: boolean;
  onClose: () => void;
  receive: ReceiveTableRow | null;
}) => {
  const { data: suppliers = [] } = useSupplier({});
  const navigate = useNavigate();

  if (!receive) return null;

  const supplier = suppliers.find((s) => s.id === receive.id_supplier);

  const subtotal =
    receive.items?.reduce((sum, item) => sum + item.subtotal, 0) || 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="gap-6 w-full max-h-[90vh] max-w-max lg:!rounded-[15px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-bold font-inter text-black text-[20px] leading-[1.5em]">
              Receive Detail
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between w-full gap-4 xl:gap-7">
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-7 w-full">
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">ID</p>
                <span className="flex items-center bg-[#F1F5F9] rounded-md px-4 py-3 border border-[#E0E0E0] w-full xl:w-max">
                  <p className="text-[#1E293B] w-max">{receive.id_receive}</p>
                </span>
              </div>
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">PO ID</p>
                <span className="flex items-center bg-[#F1F5F9] rounded-md px-4 py-3 border border-[#E0E0E0] w-full xl:w-max">
                  <p className="text-[#1E293B] w-max">{receive.id_po}</p>
                </span>
              </div>
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">Supplier</p>
                <span className="flex items-center bg-[#F1F5F9] rounded-md px-4 py-3 border border-[#E0E0E0] w-full xl:w-max">
                  <p className="text-[#1E293B] w-max">
                    {supplier?.supplierName || '-'}
                  </p>
                </span>
              </div>
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">Date</p>
                <span className="flex items-center bg-[#F1F5F9] rounded-md px-4 py-3 border border-[#E0E0E0] w-full xl:w-max">
                  <p className="text-[#1E293B] w-max">{receive.date}</p>
                </span>
              </div>
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">Subtotal</p>
                <span className="flex items-center bg-[#F1F5F9] rounded-md px-4 py-3 border border-[#E0E0E0] w-full xl:w-max">
                  <p className="text-[#1E293B] font-bold w-max">
                    $
                    {subtotal.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 xl:flex xl:w-max gap-3 w-full">
              <Button
                variant="outline"
                className="font-medium"
                onClick={() => navigate(`/receive/edit/${receive.id_receive}`)}
              >
                Edit
              </Button>
              <Button variant="default" className="font-medium">
                Download PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div className="overflow-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b">
                    <th className="font-bold text-left py-2 w-16">No</th>
                    <th className="font-bold text-left py-2 min-w-40">
                      ID Item
                    </th>
                    <th className="font-bold text-left py-2 min-w-[200px]">
                      Item Name
                    </th>
                    <th className="font-bold text-left py-2 min-w-40">
                      Category
                    </th>
                    <th className="font-bold text-left py-2 min-w-40">Brand</th>
                    <th className="font-bold text-left py-2 min-w-32">Qty</th>
                    <th className="font-bold text-left py-2 min-w-40">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receive.items?.map((item, index) => (
                    <tr
                      key={item.id_item}
                      className={`${
                        index % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'
                      }`}
                    >
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{item.id_item}</td>
                      <td className="py-2">{item.item_name}</td>
                      <td className="py-2">{item.category}</td>
                      <td className="py-2">{item.brand}</td>
                      <td className="py-2">{item.qty_receive} pcs</td>
                      <td className="py-2">
                        $
                        {item.subtotal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
