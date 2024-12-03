import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMasterItems } from '@/hooks/master-item/useMasterItems';
import { CreateMasterPriceFormData } from '@/schema/master-price';
import { SelectField } from '@/components/master-price/SelectField';
import { PriceInput } from '@/components/ui/PriceInput';
import { useEffect } from 'react';
import { useUnits } from '@/hooks/unit/useUnit';
import { FormMasterItem } from '@/components/master-item/FormMasterItem';
import { useMasterItemDialogs } from '@/hooks/master-item/useDialogs';
import { useMasterItemMutations } from '@/hooks/master-item/useMutations';
import { CreateMasterItemFormData } from '@/schema/master-item';
import { useCategories } from '@/hooks/category/useCategories';
import { useBrands } from '@/hooks/brand/useBrand';
import { BrandType } from '@/types/brand';
import { useQueryClient } from '@tanstack/react-query';

interface FormFieldsProps {
  form: UseFormReturn<CreateMasterPriceFormData>;
  onGenerateId: () => void;
  mode: 'add' | 'edit' | 'detail';
}

export const FormFields = ({ form, onGenerateId, mode }: FormFieldsProps) => {
  const { data: masterItems = [] } = useMasterItems({});
  const { data: units = [] } = useUnits({});
  const { data: categories = [] } = useCategories({});
  const { data: brands = [] } = useBrands({});

  const categoryMap = new Map(
    categories.map((cat) => [cat.id, cat.categoryName])
  );
  const brandMap = new Map(
    brands.map((brand: BrandType) => [brand.id, brand.brandName])
  );

  const isDetail = mode === 'detail';

  const {
    formDialog: itemFormDialog,
    openCreateDialog: openItemDialog,
    closeFormDialog: closeItemDialog,
  } = useMasterItemDialogs();

  const { createMutation: createItemMutation } = useMasterItemMutations();

  const queryClient = useQueryClient();

  const handleItemSubmit = async (data: CreateMasterItemFormData) => {
    try {
      const newItem = await createItemMutation.mutateAsync(data);

      await queryClient.invalidateQueries({ queryKey: ['masterItems'] });

      const formValues = {
        ...form.getValues(),
        id_item: newItem.id,
        category: (categoryMap.get(newItem.idCategory) as string) || '',
        brand: (brandMap.get(newItem.idBrand) as string) || '',
      };

      form.reset(formValues);

      closeItemDialog();
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  const selectedItem = masterItems.find(
    (item) => item.id === form.watch('id_item')
  );

  useEffect(() => {
    if (selectedItem) {
      form.setValue(
        'category',
        (categoryMap.get(selectedItem.idCategory) as string) || ''
      );
      form.setValue(
        'brand',
        (brandMap.get(selectedItem.idBrand) as string) || ''
      );
    }
  }, [selectedItem, form, categoryMap, brandMap]);

  const itemOptions = masterItems.map((item) => ({
    id: item.id,
    name: item.itemName,
  }));

  const unitOptions = units.map((unit) => ({
    id: String(unit.id),
    name: unit.unitName,
    quantity: unit.qty || 1,
  }));

  const selectedUnit = units.find(
    (unit) => String(unit.id) === String(form.watch('id_unit'))
  );

  return (
    <>
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
              Price ID
            </FormLabel>
            <div className="flex relative">
              <FormControl>
                <Input
                  {...field}
                  disabled={isDetail || mode === 'edit'}
                  placeholder="PRICE-000000"
                  className="pr-[140px] pl-4 py-3 h-14"
                />
              </FormControl>
              {mode === 'add' && (
                <Button
                  type="button"
                  onClick={onGenerateId}
                  className="absolute right-4 h-9 px-6 text-[16px] leading-[1.5em] top-1/2 -translate-y-1/2"
                >
                  Generate
                </Button>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="id_item"
        render={({ field }) => (
          <SelectField
            label="Item"
            placeholder="Select item"
            searchPlaceholder="Search item..."
            options={itemOptions}
            value={field.value}
            onChange={field.onChange}
            onAddNew={openItemDialog}
            addNewLabel="Add New Item"
            disabled={isDetail}
          />
        )}
      />
      <FormMasterItem
        open={itemFormDialog.open}
        onClose={closeItemDialog}
        onSubmit={handleItemSubmit}
        mode="add"
        isLoading={createItemMutation.isPending}
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
                <Input
                  {...field}
                  disabled={true}
                  placeholder="Category"
                  className="h-14 px-4 py-3"
                />
              </FormControl>
              <FormMessage />
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
                <Input
                  {...field}
                  disabled={true}
                  placeholder="Brand"
                  className="h-14 px-4 py-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="id_unit"
        render={({ field }) => (
          <SelectField
            label="Stock of Units"
            placeholder="Select unit"
            searchPlaceholder="Search unit..."
            options={unitOptions}
            value={String(field.value)}
            onChange={(val) => field.onChange(Number(val))}
            disabled={isDetail}
            showQuantity={true}
            quantity={selectedUnit?.qty || 1}
          />
        )}
      />

      <div className="grid grid-cols-2 gap-10">
        <FormField
          control={form.control}
          name="capital_price"
          render={({ field }) => (
            <PriceInput
              label="Capital Price"
              value={field.value}
              onChange={field.onChange}
              disabled={isDetail}
            />
          )}
        />

        <FormField
          control={form.control}
          name="selling_price"
          render={({ field }) => (
            <PriceInput
              label="Selling Price"
              value={field.value}
              onChange={field.onChange}
              disabled={isDetail}
            />
          )}
        />
      </div>
    </>
  );
};
