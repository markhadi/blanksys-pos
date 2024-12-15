import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { IssuedTableRow } from '@/types/issued';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/utils/formatters';

export const DetailIssued = ({
  open,
  onClose,
  issued,
}: {
  open: boolean;
  onClose: () => void;
  issued: IssuedTableRow | null;
}) => {
  const navigate = useNavigate();

  if (!issued) return null;

  const subtotal =
    issued.items?.reduce((sum, item) => sum + item.total, 0) || 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="gap-6 w-full max-h-[90vh] max-w-max lg:!rounded-[15px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-bold font-inter text-black text-[20px] leading-[1.5em]">
              Issued Detail
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between w-full gap-4 xl:gap-7">
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4 xl:gap-7 w-full">
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">ID</p>
                <span className="flex items-center bg-[#F1F5F9] rounded-md px-4 py-3 border border-[#E0E0E0] w-full xl:w-max">
                  <p className="text-[#1E293B] w-max">{issued.id}</p>
                </span>
              </div>
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">Date</p>
                <span className="flex items-center bg-[#F1F5F9] rounded-md px-4 py-3 border border-[#E0E0E0] w-full xl:w-max">
                  <p className="text-[#1E293B] w-max">
                    {formatDate(issued.date)}
                  </p>
                </span>
              </div>
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">Issued By</p>
                <span className="flex items-center bg-[#F1F5F9] rounded-md px-4 py-3 border border-[#E0E0E0] w-full xl:w-max">
                  <p className="text-[#1E293B] w-max">{issued.issuedBy}</p>
                </span>
              </div>
              <div className="flex items-center gap-2 w-full xl:w-max">
                <p className="font-medium min-w-20 xl:min-w-max">Total Loss</p>
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
                onClick={() => navigate(`/issued/edit/${issued.id}`)}
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
                      Capital Price
                    </th>
                    <th className="font-bold text-left py-2 min-w-40">
                      Total Loss
                    </th>
                    <th className="font-bold text-left py-2 min-w-40">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issued.items?.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${
                        index % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'
                      }`}
                    >
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{item.id}</td>
                      <td className="py-2">{item.itemName}</td>
                      <td className="py-2">{item.category}</td>
                      <td className="py-2">{item.brand}</td>
                      <td className="py-2">
                        {item.qty} {item.unit}
                      </td>
                      <td className="py-2">
                        $
                        {item.capital_price.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-2">
                        $
                        {item.total.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-2">{item.reason}</td>
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
