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
import { useIssued } from '@/hooks/issued/useIssued';
import { useIssuedMutations } from '@/hooks/issued/useMutations';
import { Issued, IssuedItem, TableIssuedItemProps } from '@/types/issued';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { useCategories } from '@/hooks/category/useCategories';
import { useBrands } from '@/hooks/brand/useBrand';
import { useUnits } from '@/hooks/unit/useUnit';

const issuedSchema = z.object({
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
          {mode === 'create' ? 'Create' : 'Edit'} Issued
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

const generateIssuedNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `ISS-${year}${month}${random}`;
};

interface IssuedHeaderProps {
  onDateChange: (date: Date) => void;
  subtotal: number;
  mode?: 'create' | 'edit';
  defaultValues?: {
    id?: string;
    date?: Date;
  };
}

const IssuedHeader = ({
  onDateChange,
  subtotal,
  mode = 'create',
  defaultValues,
}: IssuedHeaderProps) => {
  const [date, setDate] = useState<Date | undefined>(defaultValues?.date);
  const issuedNumber =
    mode === 'create' ? generateIssuedNumber() : defaultValues?.id;

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
            value={issuedNumber}
            disabled
            className="bg-[#F1F5F9] w-full xl:max-w-36 !text-[16px] text-[#1E293B] px-4 py-3"
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
          Total Loss
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
  id: z.string().optional(),
  itemName: z.string().min(1, 'Item name is required'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  qty: z.string().min(1, 'Quantity is required'),
  unit: z.string().min(1, 'Unit is required'),
  capital_price: z.string().min(1, 'Capital price is required'),
  reason: z.string().min(1, 'Reason is required'),
});

type AddItemFormValues = z.infer<typeof addItemSchema>;

interface ItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: IssuedItem) => void;
  mode: 'add' | 'edit';
  defaultValues?: IssuedItem;
}

const ItemDialog = ({
  open,
  onClose,
  onSubmit,
  mode,
  defaultValues,
}: ItemDialogProps) => {
  const { data: masterItems = [] } = useMasterItems({});
  const { data: categories = [] } = useCategories({});
  const { data: brands = [] } = useBrands({});
  const { data: units = [] } = useUnits({});

  const form = useForm<AddItemFormValues>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      id: defaultValues?.id || '',
      itemName: defaultValues?.itemName || '',
      category: defaultValues?.category || '',
      brand: defaultValues?.brand || '',
      qty: defaultValues?.qty?.toString() || '',
      unit: defaultValues?.unit || '',
      capital_price: defaultValues?.capital_price?.toString() || '',
      reason: defaultValues?.reason || '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        id: defaultValues.id,
        itemName: defaultValues.itemName,
        category: defaultValues.category,
        brand: defaultValues.brand,
        qty: defaultValues.qty.toString(),
        unit: defaultValues.unit,
        capital_price: defaultValues.capital_price.toString(),
        reason: defaultValues.reason,
      });
    }
  }, [defaultValues, form]);

  const selectedItemData = masterItems.find(
    (item) => item.itemName === form.watch('itemName')
  );

  useEffect(() => {
    if (selectedItemData) {
      form.setValue('capital_price', selectedItemData.capitalPrice.toString());
      form.setValue('category', selectedItemData.category);
      form.setValue('brand', selectedItemData.brand);
      form.setValue('id', selectedItemData.id);
    }
  }, [selectedItemData, form]);

  const onSubmitForm = (values: AddItemFormValues) => {
    const newItem: IssuedItem = {
      id: values.id || '',
      itemName: values.itemName,
      category: values.category,
      brand: values.brand,
      qty: Number(values.qty),
      unit: values.unit,
      capital_price: Number(values.capital_price),
      total: Number(values.qty) * Number(values.capital_price),
      estimationLoss: Number(values.qty) * Number(values.capital_price),
      reason: values.reason,
    };

    onSubmit(newItem);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[878px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add' : 'Edit'} Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {masterItems.map((item) => (
                        <SelectItem key={item.id} value={item.itemName}>
                          {item.itemName}
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
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.categoryName}
                          >
                            {category.categoryName}
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
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.brandName}>
                            {brand.brandName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="qty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        {...field}
                        max={selectedItemData?.stock || 0}
                        min={0}
                      />
                    </FormControl>
                    {selectedItemData && (
                      <p className="text-sm text-muted-foreground">
                        Available stock: {selectedItemData.stock}
                      </p>
                    )}
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
            </div>

            <FormField
              control={form.control}
              name="capital_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capital Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Capital price"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter reason" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="hidden"
                      placeholder="Enter reason"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-10 pt-4">
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
  onAddItem: (item: IssuedItem) => void;
  onEditItem: (item: IssuedItem) => void;
  selectedItem?: IssuedItem;
  onOpenChange: (open: boolean) => void;
}) => {
  const [open, setOpen] = useState(false);

  const mode = selectedItem ? 'edit' : 'add';

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange(open);
  };

  const handleSubmit = (item: IssuedItem) => {
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

const TableCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white p-3 rounded-[12px] shadow-md grid grid-cols-1 h-[calc(100dvh-232px)] md:h-[calc(100dvh-282px)]">
      {children}
    </div>
  );
};

interface TableHeaderProps {
  column: Column<IssuedItem>;
}

const IdItemTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-60 flex-shrink-0 flex items-center gap-2 justify-between w-full"
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

const ReasonTableHeader = ({ column }: TableHeaderProps) => {
  return (
    <button
      className="min-w-60 flex-shrink-0 flex items-center gap-2 justify-between w-full"
      onClick={() => column.toggleSorting()}
    >
      <span>REASON</span>
      <Icon icon="solar:sort-vertical-linear" className="w-4 h-4" />
    </button>
  );
};

const TableColumns = (
  onEdit: (item: IssuedItem) => void,
  onDelete: (item: IssuedItem) => void
): ColumnDef<IssuedItem>[] => [
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
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => <IdItemTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-60 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'itemName',
    accessorKey: 'itemName',
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
    id: 'qty',
    accessorKey: 'qty',
    header: ({ column }) => <QtyTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-32 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'unit',
    accessorKey: 'unit',
    header: ({ column }) => <UnitTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-32 flex-shrink-0">{getValue() as string}</span>
    ),
  },
  {
    id: 'reason',
    accessorKey: 'reason',
    header: ({ column }) => <ReasonTableHeader column={column} />,
    cell: ({ getValue }) => (
      <span className="min-w-60 flex-shrink-0">{getValue() as string}</span>
    ),
  },
];

const TableIssuedItem = ({
  data,
  isLoading,
  onEdit,
  onDelete,
  sorting = [],
  onSortingChange,
}: TableIssuedItemProps) => {
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
                      header.id === 'itemName' ? 'flex-grow' : 'flex'
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
}) => (
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
          ISSUED HAS BEEN CREATED
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

export const CreateIssued = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [items, setItems] = useState<IssuedItem[]>(() => {
    const savedItems = localStorage.getItem('issuedItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [editingItem, setEditingItem] = useState<IssuedItem>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { createMutation, updateMutation } = useIssuedMutations();
  const { data: issued } = useIssued({ id });

  useEffect(() => {
    if (id && issued && !Array.isArray(issued)) {
      setItems(issued.items);
      setSelectedDate(new Date(issued.date));
    }
  }, [id, issued]);

  const handleSubmit = () => {
    try {
      issuedSchema.parse({
        date: selectedDate,
        items: items,
      });

      const issuedData: Issued = {
        id: id || generateIssuedNumber(),
        date: selectedDate!.toISOString(),
        issuedBy: 'Admin1',
        items: items.map((item) => ({
          ...item,
          total: item.qty * item.capital_price,
          estimationLoss: item.qty * item.capital_price,
        })),
      };

      const mutation = id ? updateMutation : createMutation;

      mutation.mutate(issuedData, {
        onSuccess: () => {
          setShowSuccessModal(true);
          if (!id) {
            localStorage.removeItem('issuedItems');
            setItems([]);
            setSelectedDate(undefined);
          }
        },
        onError: (error) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: `Failed to ${id ? 'update' : 'create'} issued record`,
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

  const handleEdit = (editedItem: IssuedItem) => {
    const newItems = items.map((item) =>
      item.id === editedItem.id ? editedItem : item
    );
    setItems(newItems);
    localStorage.setItem('issuedItems', JSON.stringify(newItems));
  };

  const handleDelete = (item: IssuedItem) => {
    const newItems = items.filter((i) => i.id !== item.id);
    setItems(newItems);
    localStorage.setItem('issuedItems', JSON.stringify(newItems));
  };

  const handleAddItem = (newItem: IssuedItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('issuedItems', JSON.stringify(updatedItems));
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF');
  };

  const calculateSubtotal = (items: IssuedItem[]) => {
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
        <IssuedHeader
          onDateChange={setSelectedDate}
          subtotal={calculateSubtotal(items)}
          mode={id ? 'edit' : 'create'}
          defaultValues={{
            id,
            date: selectedDate,
          }}
        />
        <AddItem
          onAddItem={handleAddItem}
          onEditItem={handleEdit}
          selectedItem={editingItem}
          onOpenChange={(open) => !open && setEditingItem(undefined)}
        />
        <TableIssuedItem
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
            navigate('/issued');
          }}
          onDownload={handleDownloadPDF}
        />
      </div>
    </div>
  );
};
