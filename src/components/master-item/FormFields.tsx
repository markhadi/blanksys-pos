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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useCategories } from '@/hooks/category/useCategories';
import { useBrands } from '@/hooks/brand/useBrand';
import { useUnits } from '@/hooks/unit/useUnit';
import { CreateMasterItemFormData } from '@/schema/master-item';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { FormCategory } from '@/components/category/FormCategory';
import { FormBrand } from '@/components/brand/FormBrand';
import { FormUnit } from '@/components/unit/FormUnit';
import { useCategoryMutations } from '@/hooks/category/useMutations';
import { CreateFormData as CreateCategoryFormData } from '@/schema/category';
import { useCategoryDialogs } from '@/hooks/category/useDialogs';
import { useBrandMutations } from '@/hooks/brand/useMutations';
import { CreateFormData as CreateBrandFormData } from '@/schema/brand';
import { CreateFormData as CreateUnitFormData } from '@/schema/unit';
import { useUnitMutations } from '@/hooks/unit/useMutations';

interface FormFieldsProps {
  form: UseFormReturn<CreateMasterItemFormData>;
  onGenerateId: () => void;
  mode: 'add' | 'edit' | 'detail';
}

export const FormFields = ({ form, onGenerateId, mode }: FormFieldsProps) => {
  const [brandDialog, setBrandDialog] = useState({ open: false });
  const [unitDialog, setUnitDialog] = useState({ open: false });
  const { createMutation: createCategoryMutation } = useCategoryMutations();
  const { createMutation: createBrandMutation } = useBrandMutations();
  const { createMutation: createUnitMutation } = useUnitMutations();

  const { openCreateDialog, formDialog, closeFormDialog } =
    useCategoryDialogs();

  const { data: categories = [] } = useCategories({});
  const { data: brands = [] } = useBrands({});
  const { data: units = [] } = useUnits({});

  const isDetail = mode === 'detail';

  const handleCategorySubmit = async (data: CreateCategoryFormData) => {
    try {
      const newCategory = await createCategoryMutation.mutateAsync(data);
      const categoryId = parseInt(newCategory.id.toString(), 10);

      form.setValue('idCategory', categoryId);
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleBrandSubmit = async (data: CreateBrandFormData) => {
    try {
      const newBrand = await createBrandMutation.mutateAsync(data);
      const brandId = parseInt(newBrand.id.toString(), 10);

      form.setValue('idBrand', brandId);
    } catch (error) {
      console.error('Failed to create brand:', error);
    }
  };

  const handleUnitSubmit = async (data: CreateUnitFormData) => {
    try {
      const newUnit = await createUnitMutation.mutateAsync(data);
      const unitId = parseInt(newUnit.id.toString(), 10);

      form.setValue('idStockUnit', unitId);
    } catch (error) {
      console.error('Failed to create unit:', error);
    }
  };

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
            <FormItem className="flex-1">
              <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
                Category
              </FormLabel>
              <div className="flex gap-2">
                <Select
                  value={String(field.value || '')}
                  onValueChange={(value) => {
                    const numValue = parseInt(value, 10);
                    if (!isNaN(numValue)) {
                      field.onChange(numValue);
                    }
                  }}
                  disabled={isDetail}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 px-4 py-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <Button
                      type="button"
                      className="w-full font-medium font-inter text-[16px] leading-[1.5em] text-[#94A3B8] bg-transparent hover:bg-transparent items-center gap-2 justify-start"
                      onClick={openCreateDialog}
                    >
                      <Icon icon="solar:add-circle-outline" />
                      <span>Add New Category</span>
                    </Button>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idBrand"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
                Brand
              </FormLabel>
              <div className="flex gap-2">
                <Select
                  value={String(field.value || '')}
                  onValueChange={(value) => {
                    const numValue = parseInt(value, 10);
                    if (!isNaN(numValue)) {
                      field.onChange(numValue);
                    }
                  }}
                  disabled={isDetail}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 px-4 py-3">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <Button
                      type="button"
                      className="w-full font-medium font-inter text-[16px] leading-[1.5em] text-[#94A3B8] bg-transparent hover:bg-transparent items-center gap-2 justify-start"
                      onClick={() => setBrandDialog({ open: true })}
                    >
                      <Icon icon="solar:add-circle-outline" />
                      <span>Add New Brand</span>
                    </Button>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.brandName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-10">
        <FormField
          control={form.control}
          name="capitalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
                Capital Price
              </FormLabel>
              <div className="flex relative">
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={isDetail}
                    className="h-14 pl-12 pr-4 py-3 rounded-[8px] border border-[#E2E8F0]"
                  />
                </FormControl>
                <span className="absolute left-0 top-0 bg-[#64748B] text-white h-full w-11 flex items-center justify-center rounded-tl-[8px] rounded-bl-[8px]">
                  $
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idStockUnit"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
                Stock of Units
              </FormLabel>
              <div className="flex gap-2">
                <Select
                  value={String(field.value || '')}
                  onValueChange={(value) => {
                    const numValue = parseInt(value, 10);
                    if (!isNaN(numValue)) {
                      field.onChange(numValue);
                    }
                  }}
                  disabled={isDetail}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 px-4 py-3">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <Button
                      type="button"
                      className="w-full font-medium font-inter text-[16px] leading-[1.5em] text-[#94A3B8] bg-transparent hover:bg-transparent items-center gap-2 justify-start"
                      onClick={() => setUnitDialog({ open: true })}
                    >
                      <Icon icon="solar:add-circle-outline" />
                      <span>Add New Unit</span>
                    </Button>
                    {units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        {unit.unitName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormCategory
        open={formDialog.open}
        onClose={closeFormDialog}
        mode="add"
        onSubmit={handleCategorySubmit}
        isLoading={createCategoryMutation.isPending}
      />

      <FormBrand
        open={brandDialog.open}
        onClose={() => setBrandDialog({ open: false })}
        mode="add"
        onSubmit={handleBrandSubmit}
        isLoading={createBrandMutation.isPending}
      />

      <FormUnit
        open={unitDialog.open}
        onClose={() => setUnitDialog({ open: false })}
        mode="add"
        onSubmit={handleUnitSubmit}
        isLoading={createUnitMutation.isPending}
      />
    </>
  );
};
