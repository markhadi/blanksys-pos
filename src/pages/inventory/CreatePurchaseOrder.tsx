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
import { useSupplier } from '@/hooks/supplier/useSupplier';
import { Icon } from '@iconify/react';
import { CalendarIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SupplierType } from '@/types/supplier';
import {
  Column,
  getSortedRowModel,
  SortingState,
  getCoreRowModel,
  OnChangeFn,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import {
  PurchaseOrder,
  PurchaseOrderItem,
  PurchaseOrderStatus,
  TablePOItemProps,
} from '@/types/purchaseOrder';
import { ColumnDef } from '@tanstack/react-table';
import { RowAction } from '@/components/ui/RowAction';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TableConfig } from '@/config/Table';
import { TableSkeleton } from '@/components/ui/TableSkeleton';
import { EmptyState } from '@/components/ui/TableEmptyState';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { useUnits } from '@/hooks/unit/useUnit';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { usePurchaseOrderMutations } from '@/hooks/purchase-order/useMutations';
import { toast } from '@/hooks/use-toast';
import { usePurchaseOrders } from '@/hooks/purchase-order/usePurchaseOrder';

const purchaseOrderSchema = z.object({
  supplier: z.string().min(1, 'Supplier is required'),
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
          {mode === 'create' ? 'Create' : 'Edit'} Purchase Order
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

interface PurchaseOrderHeaderProps {
  onSupplierChange: (supplierId: string) => void;
  onDateChange: (date: Date) => void;
  subtotal: number;
}

const generatePONumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `PO-${year}${month}${random}`;
};

const PurchaseOrderHeader = ({
  onSupplierChange,
  onDateChange,
  subtotal,
  mode = 'create',
  defaultValues,
}: PurchaseOrderHeaderProps & {
  mode?: 'create' | 'edit';
  defaultValues?: {
    id_po?: string;
    id_supplier?: string;
    date?: Date;
  };
}) => {
  const [date, setDate] = useState<Date | undefined>(defaultValues?.date);
  const { data: suppliers = [] } = useSupplier({});
  const poNumber =
    mode === 'create' ? generatePONumber() : defaultValues?.id_po;

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
        <div className="flex gap-2 items-center w-full xl:w-auto">
          <label className="font-medium text-black min-w-28 lg:min-w-max">
            ID
          </label>
          <Input
            value={poNumber}
            disabled
            className="bg-[#F1F5F9] w-full xl:max-w-36 !text-[16px] text-[#1E293B] px-4 py-3"
          />
        </div>

        <div className="flex gap-2 items-center w-full xl:w-auto">
          <label className="font-medium text-black min-w-28 lg:min-w-max">
            Supplier
          </label>
          <Select
            onValueChange={(value) => onSupplierChange(value)}
            value={defaultValues?.id_supplier}
          >
            <SelectTrigger className="text-[16px] px-4 py-3 w-full xl:w-auto">
              <SelectValue placeholder="Select supplier" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map((supplier: SupplierType) => (
                <SelectItem
                  key={supplier.id}
                  value={supplier.id.toString()}
                  className="text-[16px] w-max"
                >
                  {supplier.supplierName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          Subtotal
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
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().min(1, 'Unit is required'),
});

type AddItemFormValues = z.infer<typeof addItemSchema>;

interface ItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: PurchaseOrderItem) => void;
  mode: 'add' | 'edit';
  defaultValues?: PurchaseOrderItem;
}

const ItemDialog = ({
  open,
  onClose,
  onSubmit,
  mode,
  defaultValues,
}: ItemDialogProps) => {
  const { data: items = [] } = useMasterItems({});
  const { data: units = [] } = useUnits({});

  const form = useForm<AddItemFormValues>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      id_item: defaultValues?.id_item || '',
      quantity: defaultValues?.qty_order?.toString() || '',
      unit: defaultValues?.unit || '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        id_item: defaultValues.id_item,
        quantity: defaultValues.qty_order.toString(),
        unit: defaultValues.unit,
      });
    }
  }, [defaultValues, form]);

  const selectedItemData = items.find(
    (item) => item.id === form.watch('id_item')
  );

  const onSubmitForm = (values: AddItemFormValues) => {
    const selectedItemData = items.find((item) => item.id === values.id_item);

    if (!selectedItemData) {
      return;
    }

    try {
      const newItem: PurchaseOrderItem = {
        id_item: values.id_item,
        item_name: selectedItemData.itemName,
        qty_order: Number(values.quantity),
        price: selectedItemData.capitalPrice,
        total: selectedItemData.capitalPrice * Number(values.quantity),
        qty_receive: 0,
        status: 'Outstanding' as PurchaseOrderStatus,
        unit: values.unit,
      };

      onSubmit(newItem);
      onClose();
      form.reset();
    } catch (error) {
      console.error('Error constructing new item:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add Item' : 'Edit Item'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(onSubmitForm)(e);
            }}
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
                      {items.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.itemName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                        <SelectItem key={unit.id} value={unit.id.toString()}>
                          {unit.unitName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Capital Price</FormLabel>
              <FormControl>
                <Input
                  disabled
                  value={
                    selectedItemData?.capitalPrice.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }) || ''
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>

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
}: {
  onAddItem: (item: PurchaseOrderItem) => void;
  onEditItem: (item: PurchaseOrderItem) => void;
  selectedItem?: PurchaseOrderItem;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);
  const mode = selectedItem ? 'edit' : 'add';

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const handleSubmit = (item: PurchaseOrderItem) => {
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
      />
    </>
  );
};

interface TableHeaderProps {
  column: Column<PurchaseOrderItem>;
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

const QtyTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-32 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>QTY</span>
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
      <span>PRICE</span>
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
      <span>TOTAL</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const TableColumns = (
  onEdit: (item: PurchaseOrderItem) => void,
  onDelete: (item: PurchaseOrderItem) => void
): ColumnDef<PurchaseOrderItem>[] => [
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
    id: 'qty_order',
    accessorKey: 'qty_order',
    header: ({ column }) => <QtyTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-32 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'price',
    accessorKey: 'price',
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
    id: 'total',
    accessorKey: 'total',
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
];

const TableCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white p-3 rounded-[12px] shadow-md grid grid-cols-1 h-[calc(100dvh-232px)] md:h-[calc(100dvh-282px)]">
      {children}
    </div>
  );
};

const TablePOItem = ({
  data,
  isLoading,
  onEdit,
  onDelete,
  sorting = [],
  onSortingChange,
}: TablePOItemProps) => {
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
              title="No Item Found"
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
            PURCHASE ORDER HAS BEEN CREATED
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

export const CreatePurchaseOrder = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [items, setItems] = useState<PurchaseOrderItem[]>(() => {
    const savedItems = localStorage.getItem('purchaseOrderItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [editingItem, setEditingItem] = useState<PurchaseOrderItem>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { createMutation, updateMutation } = usePurchaseOrderMutations();
  const { data: purchaseOrder } = usePurchaseOrders({ id_po: id });

  useEffect(() => {
    if (id && purchaseOrder && !Array.isArray(purchaseOrder)) {
      setItems(purchaseOrder.items);
      setSelectedSupplier(purchaseOrder.id_supplier.toString());
      const [day, month, year] = purchaseOrder.date.split('/');
      setSelectedDate(new Date(Number(year), Number(month) - 1, Number(day)));
    }
  }, [id, purchaseOrder]);

  const handleSubmit = () => {
    try {
      purchaseOrderSchema.parse({
        supplier: selectedSupplier,
        date: selectedDate,
        items: items,
      });

      const poData: PurchaseOrder = {
        id_po: id || generatePONumber(),
        date: format(selectedDate!, 'dd/MM/yyyy'),
        id_supplier: parseInt(selectedSupplier, 10),
        created_by: 'Admin1',
        status: 'Outstanding' as PurchaseOrderStatus,
        items: items.map((item) => ({
          id_item: item.id_item,
          item_name: item.item_name,
          qty_order: item.qty_order,
          unit: item.unit,
          price: item.price,
          total: item.total,
          qty_receive: 0,
          status: 'Outstanding' as PurchaseOrderStatus,
        })),
      };

      console.log(poData);

      const mutation = id ? updateMutation : createMutation;

      mutation.mutate(poData, {
        onSuccess: () => {
          setShowSuccessModal(true);
          if (!id) {
            localStorage.removeItem('purchaseOrderItems');
            setItems([]);
            setSelectedSupplier('');
            setSelectedDate(undefined);
          }
        },
        onError: (error) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: `Failed to ${id ? 'update' : 'create'} purchase order`,
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

  const handleEdit = (editedItem: PurchaseOrderItem) => {
    const newItems = items.map((item) =>
      item.id_item === editedItem.id_item ? editedItem : item
    );
    setItems(newItems);
    localStorage.setItem('purchaseOrderItems', JSON.stringify(newItems));
  };

  const handleDelete = (item: PurchaseOrderItem) => {
    const newItems = items.filter((i) => i.id_item !== item.id_item);
    setItems(newItems);
    localStorage.setItem('purchaseOrderItems', JSON.stringify(newItems));
  };

  const handleAddItem = (newItem: PurchaseOrderItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('purchaseOrderItems', JSON.stringify(updatedItems));
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF');
  };

  const calculateSubtotal = (items: PurchaseOrderItem[]) => {
    return items.reduce((total, item) => total + item.total, 0);
  };

  return (
    <div className="flex flex-col gap-5">
      <ActionsHeader
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        mode={id ? 'edit' : 'create'}
      />
      <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm">
        <PurchaseOrderHeader
          onSupplierChange={setSelectedSupplier}
          onDateChange={setSelectedDate}
          subtotal={calculateSubtotal(items)}
          mode={id ? 'edit' : 'create'}
          defaultValues={{
            id_po: id,
            id_supplier: selectedSupplier,
            date: selectedDate,
          }}
        />
        <AddItem
          onAddItem={handleAddItem}
          onEditItem={handleEdit}
          selectedItem={editingItem}
          onOpenChange={(open) => !open && setEditingItem(undefined)}
        />
        <TablePOItem
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
            navigate('/purchase-order');
          }}
          onDownload={handleDownloadPDF}
        />
      </div>
    </div>
  );
};
