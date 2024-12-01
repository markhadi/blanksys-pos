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
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useCategories } from '@/hooks/category/useCategories';
import { useBrands } from '@/hooks/brand/useBrand';
import { useUnits } from '@/hooks/unit/useUnit';
import { CreateMasterItemFormData } from '@/schema/master-item';
import { FormCategory } from '@/components/category/FormCategory';
import { FormBrand } from '@/components/brand/FormBrand';
import { FormUnit } from '@/components/unit/FormUnit';
import { useCategoryMutations } from '@/hooks/category/useMutations';
import { CreateFormData as CreateCategoryFormData } from '@/schema/category';
import { useBrandMutations } from '@/hooks/brand/useMutations';
import { CreateFormData as CreateBrandFormData } from '@/schema/brand';
import { CreateFormData as CreateUnitFormData } from '@/schema/unit';
import { useUnitMutations } from '@/hooks/unit/useMutations';
import { SelectField } from './SelectField';
import { PriceInput } from '@/components/ui/PriceInput';
import { DialogState } from '@/types/master-item';
import { useState } from 'react';

interface FormFieldsProps {
  form: UseFormReturn<CreateMasterItemFormData>;
  onGenerateId: () => void;
  mode: 'add' | 'edit' | 'detail';
}

const useDialogState = (initialState: DialogState = { open: false }) => {
  const [state, setState] = useState<DialogState>(initialState);

  const open = () => setState({ open: true });
  const close = () => setState({ open: false });

  return {
    state,
    open,
    close,
  };
};

export const FormFields = ({ form, onGenerateId, mode }: FormFieldsProps) => {
  const categoryDialog = useDialogState();
  const brandDialog = useDialogState();
  const unitDialog = useDialogState();

  const { createMutation: createCategoryMutation } = useCategoryMutations();
  const { createMutation: createBrandMutation } = useBrandMutations();
  const { createMutation: createUnitMutation } = useUnitMutations();

  const { data: categories = [] } = useCategories({});
  const { data: brands = [] } = useBrands({});
  const { data: units = [] } = useUnits({});

  const isDetail = mode === 'detail';

  const handleCategorySubmit = async (data: CreateCategoryFormData) => {
    try {
      const newCategory = await createCategoryMutation.mutateAsync(data);
      form.setValue('idCategory', parseInt(newCategory.id.toString(), 10));
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleBrandSubmit = async (data: CreateBrandFormData) => {
    try {
      const newBrand = await createBrandMutation.mutateAsync(data);
      form.setValue('idBrand', parseInt(newBrand.id.toString(), 10));
    } catch (error) {
      console.error('Failed to create brand:', error);
    }
  };

  const handleUnitSubmit = async (data: CreateUnitFormData) => {
    try {
      const newUnit = await createUnitMutation.mutateAsync(data);
      form.setValue('idStockUnit', parseInt(newUnit.id.toString(), 10));
    } catch (error) {
      console.error('Failed to create unit:', error);
    }
  };

  const categoryOptions = categories.map((c) => ({
    id: c.id,
    name: c.categoryName,
  }));
  const brandOptions = brands.map((b) => ({ id: b.id, name: b.brandName }));
  const unitOptions = units.map((u) => ({ id: u.id, name: u.unitName }));

  return (
    <>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                disabled={isDetail}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
              ID Item / Barcode
            </FormLabel>
            <div className="flex relative">
              <FormControl>
                <Input
                  {...field}
                  disabled={isDetail || mode === 'edit'}
                  placeholder="ITEM-000000"
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
        name="itemName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
              Item Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={isDetail}
                placeholder="Item Name"
                className="h-14 px-4 py-3"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-10">
        <FormField
          control={form.control}
          name="idCategory"
          render={({ field }) => (
            <SelectField
              label="Category"
              placeholder="Select category"
              searchPlaceholder="Search category..."
              options={categoryOptions}
              value={field.value}
              onChange={field.onChange}
              onAddNew={categoryDialog.open}
              addNewLabel="Add New Category"
              disabled={isDetail}
            />
          )}
        />

        <FormField
          control={form.control}
          name="idBrand"
          render={({ field }) => (
            <SelectField
              label="Brand"
              placeholder="Select brand"
              searchPlaceholder="Search brand..."
              options={brandOptions}
              value={field.value}
              onChange={field.onChange}
              onAddNew={brandDialog.open}
              addNewLabel="Add New Brand"
              disabled={isDetail}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-10">
        <FormField
          control={form.control}
          name="capitalPrice"
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
          name="idStockUnit"
          render={({ field }) => (
            <SelectField
              label="Stock of Units"
              placeholder="Select unit"
              searchPlaceholder="Search unit..."
              options={unitOptions}
              value={field.value}
              onChange={field.onChange}
              onAddNew={unitDialog.open}
              addNewLabel="Add New Unit"
              disabled={isDetail}
            />
          )}
        />
      </div>

      <FormCategory
        open={categoryDialog.state.open}
        onClose={categoryDialog.close}
        mode="add"
        onSubmit={handleCategorySubmit}
        isLoading={createCategoryMutation.isPending}
      />

      <FormBrand
        open={brandDialog.state.open}
        onClose={brandDialog.close}
        mode="add"
        onSubmit={handleBrandSubmit}
        isLoading={createBrandMutation.isPending}
      />

      <FormUnit
        open={unitDialog.state.open}
        onClose={unitDialog.close}
        mode="add"
        onSubmit={handleUnitSubmit}
        isLoading={createUnitMutation.isPending}
      />
    </>
  );
};
