import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { PurchaseOrderTableRow } from '@/types/purchaseOrder';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useSupplier } from '@/hooks/supplier/useSupplier';

export const DetailPurchaseOrder = ({
  open,
  onClose,
  purchaseOrder,
}: {
  open: boolean;
  onClose: () => void;
  purchaseOrder: PurchaseOrderTableRow | null;
}) => {
  const { data: suppliers = [] } = useSupplier({});
  const navigate = useNavigate();

  if (!purchaseOrder) return null;

  const supplier = suppliers.find((s) => s.id === purchaseOrder.id_supplier);

  const getItemStatus = (qtyOrder: number, qtyReceive: number) => {
    if (qtyReceive === 0) return 'Outstanding';
    if (qtyReceive === qtyOrder) return 'Complete';
    return 'Partial';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'text-green-800';
      case 'Partial':
        return 'text-yellow-800';
      case 'Outstanding':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  const subtotal =
    purchaseOrder.items?.reduce((sum, item) => sum + item.total, 0) || 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="gap-6 w-full max-h-[90vh] max-w-max lg:!rounded-[15px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-bold font-inter text-black text-[20px] leading-[1.5em]">
              Purchase Order Detail
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between w-full gap-4 xl:gap-7">
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-7 w-full">
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">ID</p>
                <span className="flex items-center bg-[#F1F5F9] rounded-md px-4 py-3 border border-[#E0E0E0] w-full xl:w-max">
                  <p className="text-[#1E293B] w-max">{purchaseOrder.id_po}</p>
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
                  <p className="text-[#1E293B] w-max">{purchaseOrder.date}</p>
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
                onClick={() =>
                  navigate(`/purchase-order/edit/${purchaseOrder.id_po}`)
                }
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
                    <th className="font-bold text-left py-2 min-w-56">
                      ID Item
                    </th>
                    <th className="font-bold text-left py-2 min-w-[450px]">
                      Item Name
                    </th>
                    <th className="font-bold text-left py-2 min-w-52">
                      Qty Order
                    </th>
                    <th className="font-bold text-left py-2 min-w-48">Price</th>
                    <th className="font-bold text-left py-2 min-w-48">Total</th>
                    <th className="font-bold text-left py-2 min-w-44">
                      Qty Receive
                    </th>
                    <th className="font-bold text-left py-2 min-w-48">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrder.items?.map((item, index) => {
                    const status = getItemStatus(
                      item.qty_order,
                      item.qty_receive
                    );
                    return (
                      <tr
                        key={item.id_item}
                        className={`${
                          index % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'
                        }`}
                      >
                        <td className="py-2">{item.id_item}</td>
                        <td className="py-2">{item.item_name}</td>
                        <td className="py-2">{item.qty_order}</td>
                        <td className="py-2">
                          $
                          {item.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="py-2">
                          $
                          {item.total.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="py-2">{item.qty_receive}</td>
                        <td className="py-2">
                          <span className={`${getStatusColor(status)}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
