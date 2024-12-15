import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { CalendarIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { usePurchaseOrders } from '@/hooks/purchase-order/usePurchaseOrder';
import { useReceiveMutations } from '@/hooks/receive/useMutations';
import {
  Receive,
  ReceiveItem,
  ReceiveStatus,
  TableReceiveItemProps,
} from '@/types/receive';
import { useUnits } from '@/hooks/unit/useUnit';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { RowAction } from '@/components/ui/RowAction';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TableConfig } from '@/config/Table';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { EmptyState } from '@/components/ui/TableEmptyState';
import { useReceives } from '@/hooks/receive/useReceive';
import { useSupplier } from '@/hooks/supplier/useSupplier';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { useCategories } from '@/hooks/category/useCategories';
import { useBrands } from '@/hooks/brand/useBrand';
import { BrandType } from '@/types/brand';

const receiveSchema = z.object({
  id_po: z.string().min(1, 'PO ID is required'),
  date: z.date({
    required_error: 'Date is required',
  }),
  items: z.array(z.any()).min(1, 'At least one item is required'),
});

const ActionsHeader = ({
  onSubmit,
  isSubmitting,
  mode,
}: {
  onSubmit: () => void;
  isSubmitting: boolean;
  mode: 'create' | 'edit';
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
      <div className="flex items-center gap-2 text-[#0F172A]">
        <button
          role="button"
          onClick={() => navigate(-1)}
          className="flex items-center"
        >
          <Icon height={24} width={24} icon="icon-park-outline:left" />
        </button>
        <h2 className="font-bold text-[20px]">
          {mode === 'create' ? 'Create' : 'Edit'} Receive
        </h2>
      </div>
      <Button
        className="w-full sm:w-auto"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </div>
  );
};

interface ReceiveHeaderProps {
  onPOChange: (poId: string) => void;
  onDateChange: (date: Date) => void;
  subtotal: number;
  mode?: 'create' | 'edit';
  defaultValues?: {
    id_receive?: string;
    id_po?: string;
    date?: Date;
  };
}

const generateReceiveNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `RCV-${year}${month}${random}`;
};

const ReceiveHeader = ({
  onPOChange,
  onDateChange,
  subtotal,
  mode = 'create',
  defaultValues,
}: ReceiveHeaderProps) => {
  const [date, setDate] = useState<Date | undefined>(defaultValues?.date);
  const { data: purchaseOrders = [] } = usePurchaseOrders({});
  const { data: suppliers = [] } = useSupplier({});
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const receiveNumber =
    mode === 'create' ? generateReceiveNumber() : defaultValues?.id_receive;

  // Filter PO yang belum complete
  const incompletePOs = Array.isArray(purchaseOrders)
    ? purchaseOrders.filter(
        (po: any) =>
          po.status !== 'Complete' ||
          (mode === 'edit' && po.id_po === defaultValues?.id_po)
      )
    : [];

  useEffect(() => {
    if (defaultValues?.id_po || mode === 'edit') {
      if (Array.isArray(purchaseOrders)) {
        const selectedPO = purchaseOrders.find(
          (po) => po.id_po === defaultValues?.id_po
        );
        const supplierName =
          suppliers.find((s) => s.id === selectedPO?.id_supplier)
            ?.supplierName || '';
        setSelectedSupplier(supplierName);
      }
    }
  }, [defaultValues?.id_po, purchaseOrders, suppliers, mode]);

  useEffect(() => {
    if (defaultValues?.date) {
      setDate(defaultValues.date);
    }
  }, [defaultValues]);

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) onDateChange(date);
  };

  return (
    <div className="bg-white p-3 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-7">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-7 w-full">
        <div className="gap-2 items-center w-full xl:w-auto hidden">
          <label className="font-medium text-black min-w-28 lg:min-w-max">
            ID
          </label>
          <Input
            value={receiveNumber}
            disabled
            className="bg-[#F1F5F9] w-full xl:max-w-36 !text-[16px] text-[#1E293B] px-4 py-3"
          />
        </div>

        <div className="flex gap-2 items-center w-full xl:w-auto">
          <label className="font-medium text-black min-w-28 lg:min-w-max">
            PO ID
          </label>
          <Select
            onValueChange={(value) => {
              onPOChange(value);
              console.log('Selected Value:', value);
              console.log('Purchase Orders:', purchaseOrders);

              if (Array.isArray(purchaseOrders)) {
                const selectedPO = purchaseOrders.find(
                  (po) => po.id_po === value
                );
                console.log('Selected PO:', selectedPO);
                const supplierName =
                  suppliers.find((s) => s.id === selectedPO?.id_supplier)
                    ?.supplierName || '';
                setSelectedSupplier(supplierName);
              }
            }}
            value={defaultValues?.id_po}
            disabled={mode === 'edit'}
          >
            <SelectTrigger className="text-[16px] px-4 py-3 w-full xl:w-auto">
              <SelectValue placeholder="Select PO" />
            </SelectTrigger>
            <SelectContent>
              {incompletePOs.map((po: any) => (
                <SelectItem
                  key={po.id_po}
                  value={po.id_po}
                  className="text-[16px] w-full"
                >
                  {po.id_po}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center w-full xl:w-auto">
          <label className="font-medium text-black min-w-28 lg:min-w-max">
            Supplier
          </label>
          <Input
            value={selectedSupplier}
            disabled
            className="bg-[#F1F5F9] w-full xl:max-w-max !text-[16px] text-[#1E293B] px-4 py-3"
          />
        </div>

        <div className="flex gap-2 items-center w-full xl:w-auto">
          <label className="font-medium text-black min-w-28 lg:min-w-max">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full h-12 justify-between gap-2 xl:justify-start text-left font-normal text-[16px] px-4 py-3 xl:w-auto',
                  !date && 'text-muted-foreground'
                )}
              >
                {date ? format(date, 'MM/dd/yyyy') : <span>Pick a date</span>}
                <CalendarIcon className="mr-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-2 items-center w-full xl:w-auto">
        <label className="font-bold uppercase text-black text-[18px] min-w-28 lg:min-w-max">
          Ammount
        </label>
        <Input
          value={subtotal.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
          disabled
          className="bg-[#F1F5F9] text-right !text-[#1E293B] !text-[18px] px-4 py-3 w-full xl:w-auto"
        />
      </div>
    </div>
  );
};

const addItemSchema = z.object({
  id_item: z.string().min(1, 'Item is required'),
  category: z.string().optional(),
  brand: z.string().optional(),
  qty_receive: z.string().min(1, 'Quantity is required'),
  unit: z.string().min(1, 'Unit is required'),
  price_cut: z.string().optional(),
  discount: z.string().optional(),
  status: z.string().min(1, 'Status is required'),
});

type AddItemFormValues = z.infer<typeof addItemSchema>;

interface ItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: ReceiveItem) => void;
  mode: 'add' | 'edit';
  defaultValues?: ReceiveItem;
  poItems?: any[];
}

const ItemDialog = ({
  open,
  onClose,
  onSubmit,
  mode,
  defaultValues,
  poItems = [],
}: ItemDialogProps) => {
  const { data: units = [] } = useUnits({});
  const { data: masterItems = [] } = useMasterItems({});
  const { data: categories = [] } = useCategories({});
  const { data: brands = [] } = useBrands({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const categoryMap = new Map(
    categories.map((cat) => [cat.id, cat.categoryName])
  );
  const brandMap = new Map(
    brands.map((brand: BrandType) => [brand.id, brand.brandName])
  );

  const form = useForm<AddItemFormValues>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      id_item: defaultValues?.id_item || '',
      qty_receive: defaultValues?.qty_receive?.toString() || '',
      unit: defaultValues?.units || '',
      price_cut: defaultValues?.price_cut?.toString() || '0',
      discount: defaultValues?.discount?.toString() || '0',
      category: defaultValues?.category || '',
      brand: defaultValues?.brand || '',
      status: defaultValues?.status || '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        id_item: defaultValues.id_item || '',
        qty_receive: defaultValues.qty_receive?.toString() || '',
        unit: defaultValues.units || '',
        price_cut: defaultValues.price_cut?.toString() || '0',
        discount: defaultValues.discount?.toString() || '0',
        category: defaultValues.category || '',
        brand: defaultValues.brand || '',
        status: defaultValues.status || '',
      });
      setSelectedCategory(defaultValues.category || '');
      setSelectedBrand(defaultValues.brand || '');
    }
  }, [defaultValues, form]);

  useEffect(() => {
    const selectedItem = masterItems.find(
      (item) => item.id === form.watch('id_item')
    );

    if (selectedItem) {
      const category = categoryMap.get(selectedItem.idCategory) as string;
      const brand = brandMap.get(selectedItem.idBrand) as string;
      setSelectedCategory(category || '');
      setSelectedBrand(brand || '');
      form.setValue('category', category || '');
      form.setValue('brand', brand || '');
    }
  }, [form.watch('id_item'), masterItems, categoryMap, brandMap, form]);

  const onSubmitForm = (values: AddItemFormValues) => {
    const selectedItemData = poItems.find(
      (item) => item.id_item === values.id_item
    );

    console.log('Selected Item Data:', selectedItemData);
    console.log('PO Items:', poItems);

    if (!selectedItemData) {
      return;
    }

    try {
      const newItem: ReceiveItem = {
        id_item: values.id_item,
        item_name: selectedItemData.item_name,
        category: values.category || '',
        brand: values.brand || '',
        qty_order: selectedItemData.qty_order,
        qty_receive: Number(values.qty_receive),
        units: values.unit,
        amount: selectedItemData.price,
        price_cut: Number(values.price_cut || 0),
        discount: Number(values.discount || 0),
        capital_price: selectedItemData.price,
        subtotal:
          (selectedItemData.price - Number(values.price_cut || 0)) *
          Number(values.qty_receive) *
          (1 - Number(values.discount || 0) / 100),
        status: values.status as ReceiveStatus,
      };

      console.log('New Item:', newItem);

      onSubmit(newItem);
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error constructing new item:', error);
    }
  };

  const receiveStatuses = [
    { value: 'Complete', label: 'Complete', color: 'text-green-600' },
    { value: 'Partial', label: 'Partial', color: 'text-yellow-600' },
    { value: 'Outstanding', label: 'Outstanding', color: 'text-blue-600' },
    { value: 'Cancel', label: 'Cancel', color: 'text-red-600' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Item' : 'Edit Item'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="id_item"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={mode === 'edit'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {poItems.map((item) => (
                        <SelectItem key={item.id_item} value={item.id_item}>
                          {item.item_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Input {...field} value={selectedCategory} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
                      Brand
                    </FormLabel>
                    <FormControl>
                      <Input {...field} value={selectedBrand} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="qty_receive"
              render={({ field }) => {
                const selectedItem = poItems.find(
                  (item) => item.id_item === form.watch('id_item')
                );
                const maxQty = selectedItem?.qty_order || 0;

                return (
                  <FormItem>
                    <FormLabel>Quantity Received</FormLabel>
                    <div className="space-y-1">
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          max={maxQty}
                          value={field.value || ''}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 0 && (!value || value <= maxQty)) {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <p className="text-sm text-muted-foreground">
                        Max quantity: {maxQty}
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.id} value={unit.unitName}>
                          {unit.unitName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price_cut"
                render={({ field }) => {
                  const selectedItem = poItems.find(
                    (item) => item.id_item === form.watch('id_item')
                  );
                  const price = selectedItem?.price || 0;

                  return (
                    <FormItem>
                      <FormLabel>Price Cut</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => {
                            const priceCut = parseFloat(e.target.value);
                            if (priceCut >= 0) {
                              field.onChange(e.target.value);
                              // Hitung dan update discount
                              const discountPercentage =
                                (priceCut / price) * 100;
                              form.setValue(
                                'discount',
                                discountPercentage.toFixed(0)
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => {
                  const selectedItem = poItems.find(
                    (item) => item.id_item === form.watch('id_item')
                  );
                  const price = selectedItem?.price || 0;

                  return (
                    <FormItem>
                      <FormLabel>Discount (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => {
                            const discount = parseInt(e.target.value);
                            if (discount >= 0 && discount <= 100) {
                              field.onChange(e.target.value);
                              // Hitung dan update price cut
                              const priceCut = (discount / 100) * price;
                              form.setValue('price_cut', priceCut.toFixed(2));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receive Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status">
                          {field.value && (
                            <span
                              className={
                                receiveStatuses.find(
                                  (s) => s.value === field.value
                                )?.color
                              }
                            >
                              {
                                receiveStatuses.find(
                                  (s) => s.value === field.value
                                )?.label
                              }
                            </span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {receiveStatuses.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                          className={status.color}
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{mode === 'add' ? 'Add' : 'Save'}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const AddItem = ({
  onAddItem,
  onEditItem,
  selectedItem,
  onOpenChange,
  poItems,
}: {
  onAddItem: (item: ReceiveItem) => void;
  onEditItem: (item: ReceiveItem) => void;
  selectedItem?: ReceiveItem;
  onOpenChange?: (open: boolean) => void;
  poItems?: any[];
}) => {
  const [open, setOpen] = useState(false);
  const mode = selectedItem ? 'edit' : 'add';

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const handleSubmit = (item: ReceiveItem) => {
    if (mode === 'edit') {
      onEditItem(item);
    } else {
      onAddItem(item);
    }
    handleOpenChange(false);
  };

  return (
    <>
      <button
        role="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] transition-colors duration-300 bg-white p-3 w-max"
      >
        <Icon height={24} width={24} icon="solar:add-square-bold" />
        <span className="font-medium text-[16px]">Add Item</span>
      </button>

      <ItemDialog
        open={open || !!selectedItem}
        onClose={() => handleOpenChange(false)}
        onSubmit={handleSubmit}
        mode={mode}
        defaultValues={selectedItem}
        poItems={poItems}
      />
    </>
  );
};

interface TableHeaderProps {
  column: Column<ReceiveItem>;
}

const IdItemTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-56 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>ID ITEM</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const ItemNameTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-96 flex-shrink-0 flex-grow flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>ITEM NAME</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const CategoryTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-60 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>CATEGORY</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const BrandTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-60 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>BRAND</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const PriceCutTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-32 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>PRICE CUT</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const DiscountTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-32 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>DISCOUNT</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const QtyTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-32 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>QUANTITY</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const UnitTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-32 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>UNIT</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const PriceTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-48 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>CAPITAL PRICE</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const TotalTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-48 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>SUBTOTAL</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const StatusTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-32 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>STATUS</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const receiveStatuses = [
  { value: 'Complete', label: 'Complete', color: 'text-green-600' },
  { value: 'Partial', label: 'Partial', color: 'text-yellow-600' },
  { value: 'Outstanding', label: 'Outstanding', color: 'text-blue-600' },
  { value: 'Cancel', label: 'Cancel', color: 'text-red-600' },
];

const TableColumns = (
  onEdit: (item: ReceiveItem) => void,
  onDelete: (item: ReceiveItem) => void
): ColumnDef<ReceiveItem>[] => [
  {
    id: 'action',
    accessorKey: 'action',
    header: () => <span className="w-[77px]">ACTION</span>,
    cell: ({ row }) => (
      <div className="w-[77px] flex justify-center">
        <RowAction
          onEdit={() => onEdit(row.original)}
          onDelete={() => onDelete(row.original)}
        />
      </div>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => <StatusTableHeader column={column} />,
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const statusConfig = receiveStatuses.find((s) => s.value === status);
      return (
        <span className={`min-w-32 flex-shrink-0 ${statusConfig?.color}`}>
          {status}
        </span>
      );
    },
  },
  {
    id: 'id_item',
    accessorKey: 'id_item',
    header: ({ column }) => <IdItemTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-56 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'item_name',
    accessorKey: 'item_name',
    header: ({ column }) => <ItemNameTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-96 flex-grow flex-shrink-0">
        {getValue() as string}
      </span>
    ),
  },
  {
    id: 'category',
    accessorKey: 'category',
    header: ({ column }) => <CategoryTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-60 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'brand',
    accessorKey: 'brand',
    header: ({ column }) => <BrandTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-60 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'price_cut',
    accessorKey: 'price_cut',
    header: ({ column }) => <PriceCutTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-32 flex-shrink-0">
        {(getValue() as number).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
    ),
  },
  {
    id: 'discount',
    accessorKey: 'discount',
    header: ({ column }) => <DiscountTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-32 flex-shrink-0">
        {(getValue() as number).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
    ),
  },
  {
    id: 'capital_price',
    accessorKey: 'capital_price',
    header: ({ column }) => <PriceTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-48 flex-shrink-0">
        {(getValue() as number).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
    ),
  },
  {
    id: 'qty_receive',
    accessorKey: 'qty_receive',
    header: ({ column }) => <QtyTableHeader column={column} />,
    cell: ({ row }) => {
      const qtyReceive = row.original.qty_receive;
      const qtyOrder = row.original.qty_order;
      return (
        <span className="min-w-32 flex-shrink-0 text-right">
          {qtyReceive} <span className="text-[#94A3B8]">of {qtyOrder}</span>
        </span>
      );
    },
  },
  {
    id: 'units',
    accessorKey: 'units',
    header: ({ column }) => <UnitTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-32 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'subtotal',
    accessorKey: 'subtotal',
    header: ({ column }) => <TotalTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-48 flex-shrink-0">
        {(getValue() as number).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
    ),
  },
];

const TableCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white p-3 rounded-[12px] shadow-md grid grid-cols-1 h-[calc(100dvh-232px)] md:h-[calc(100dvh-282px)]">
      {children}
    </div>
  );
};

const TableReceiveItem = ({
  data,
  isLoading,
  onEdit,
  onDelete,
  sorting = [],
  onSortingChange,
}: TableReceiveItemProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const columns = useMemo(
    () => TableColumns(onEdit, onDelete),
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: onSortingChange as OnChangeFn<SortingState>,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => TableConfig.ROW_HEIGHT,
    overscan: TableConfig.OVERSCAN,
  });

  return (
    <TableCard>
      <div
        className="overflow-auto relative rounded-lg"
        ref={parentRef}
        style={{ height: TableConfig.HEIGHT }}
      >
        <div className="w-full min-w-max bg-white text-left text-slate-700">
          <div className="font-bold font-inter text-[16px] tracking-[-0.01em] leading-[1.5em] text-[#0F172A] border-b border-[#CBD5E1] z-10 sticky top-0 w-full bg-white h-[54px]">
            <div className="w-full min-w-96 min-h-12 text-left flex gap-5 items-center">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <div
                    key={header.id}
                    className={`${
                      header.id === 'item_name' ? 'flex-grow' : 'flex'
                    } flex-shrink-0`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {isLoading ? (
            <TableSkeleton rows={8} rowHeight={TableConfig.ROW_HEIGHT} />
          ) : rows.length === 0 ? (
            <EmptyState
              title="No Items Found"
              description="Try adding a new item."
            />
          ) : (
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <div
                    key={row.id}
                    className={`absolute w-full flex gap-5 h-max items-center font-normal font-inter text-[16px] tracking-[-0.01em] leading-[1.5em] text-[#1E293B] ${
                      row.index % 2 === 0 ? 'bg-[#F8FAFC]' : 'bg-white'
                    }`}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <div
                        key={cell.id}
                        className={`${
                          cell.column.id === 'item_name' ? 'flex-grow' : 'flex'
                        } flex-shrink-0`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </TableCard>
  );
};

const SuccessModal = ({
  open,
  onClose,
  onDownload,
}: {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] max-h-96 w-full h-full flex flex-col items-center justify-center gap-10 px-10 py-5">
        <div className="flex flex-col items-center gap-5 max-w-64">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <Icon
              icon="solar:check-circle-bold"
              className="w-20 h-20 text-green-600"
            />
          </div>

          <DialogTitle className="text-center text-[20px] font-bold">
            RECEIVE HAS BEEN CREATED
          </DialogTitle>
        </div>
        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button className="flex-1 gap-2" onClick={onDownload}>
            <Icon icon="solar:file-download-bold" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const CreateReceive = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [items, setItems] = useState<ReceiveItem[]>(() => {
    const savedItems = localStorage.getItem('receiveItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [editingItem, setEditingItem] = useState<ReceiveItem>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedPO, setSelectedPO] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { createMutation, updateMutation } = useReceiveMutations();
  const { data: purchaseOrder } = usePurchaseOrders({ id_po: selectedPO });
  const { data: receive } = useReceives({ id_receive: id });
  const { data: suppliers = [] } = useSupplier({});

  useEffect(() => {
    if (id && receive && !Array.isArray(receive)) {
      setItems(receive.items);
      setSelectedPO(receive.id_po);
      const [day, month, year] = receive.date.split('/');
      setSelectedDate(new Date(Number(year), Number(month) - 1, Number(day)));
    }
  }, [id, receive]);

  useEffect(() => {
    if (!id && selectedPO && purchaseOrder && !Array.isArray(purchaseOrder)) {
      setItems([]);
      localStorage.removeItem('receiveItems');
    }
  }, [selectedPO, purchaseOrder, id]);

  const handleSubmit = () => {
    try {
      receiveSchema.parse({
        id_po: selectedPO,
        date: selectedDate,
        items: items,
      });

      if (!purchaseOrder || Array.isArray(purchaseOrder)) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Invalid Purchase Order data',
        });
        return;
      }

      const receiveData: Receive = {
        id_receive: id || generateReceiveNumber(),
        id_po: selectedPO,
        date: format(selectedDate!, 'dd/MM/yyyy'),
        id_supplier: purchaseOrder.id_supplier,
        supplier_name:
          suppliers.find((s) => s.id === purchaseOrder.id_supplier)
            ?.supplierName || '',
        receive_by: 'Admin1',
        items: items.map((item) => ({
          ...item,
          status: item.qty_receive >= item.qty_order ? 'Complete' : 'Partial',
        })),
      };

      const mutation = id ? updateMutation : createMutation;

      mutation.mutate(receiveData, {
        onSuccess: () => {
          setShowSuccessModal(true);
          if (!id) {
            localStorage.removeItem('receiveItems');
            setItems([]);
            setSelectedPO('');
            setSelectedDate(undefined);
          }
        },
        onError: (error) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: `Failed to ${id ? 'update' : 'create'} receive record`,
          });
          console.log(error);
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: errorMessages.join(', '),
        });
      }
    }
  };

  const handleEdit = (editedItem: ReceiveItem) => {
    const newItems = items.map((item) =>
      item.id_item === editedItem.id_item ? editedItem : item
    );
    setItems(newItems);
    localStorage.setItem('receiveItems', JSON.stringify(newItems));
  };

  const handleDelete = (item: ReceiveItem) => {
    const newItems = items.filter((i) => i.id_item !== item.id_item);
    setItems(newItems);
    localStorage.setItem('receiveItems', JSON.stringify(newItems));
  };

  const handleAddItem = (newItem: ReceiveItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('receiveItems', JSON.stringify(updatedItems));
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF');
  };

  const calculateSubtotal = (items: ReceiveItem[]) => {
    return items.reduce((total, item) => total + item.subtotal, 0);
  };

  return (
    <div className="flex flex-col gap-5">
      <ActionsHeader
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        mode={id ? 'edit' : 'create'}
      />
      <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm">
        <ReceiveHeader
          onPOChange={setSelectedPO}
          onDateChange={setSelectedDate}
          subtotal={calculateSubtotal(items)}
          mode={id ? 'edit' : 'create'}
          defaultValues={{
            id_receive: id,
            id_po: selectedPO,
            date: selectedDate,
          }}
        />
        <AddItem
          onAddItem={handleAddItem}
          onEditItem={handleEdit}
          selectedItem={editingItem}
          onOpenChange={(open) => !open && setEditingItem(undefined)}
          poItems={
            purchaseOrder && !Array.isArray(purchaseOrder)
              ? purchaseOrder.items
              : []
          }
        />
        <TableReceiveItem
          data={items}
          isLoading={false}
          onEdit={setEditingItem}
          onDelete={handleDelete}
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <SuccessModal
          open={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/receive');
          }}
          onDownload={handleDownloadPDF}
        />
      </div>
    </div>
  );
};
