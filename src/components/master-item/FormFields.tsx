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

interface FormFieldsProps {
  form: UseFormReturn<CreateMasterItemFormData>;
  onGenerateId: () => void;
}

export const FormFields = ({ form, onGenerateId }: FormFieldsProps) => {
  const { data: categories = [] } = useCategories({});
  const { data: brands = [] } = useBrands({});
  const { data: units = [] } = useUnits({});

  return (
    <>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ImageUpload value={field.value} onChange={field.onChange} />
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
                  placeholder="ITEM-000000"
                  className="pr-[140px] pl-4 py-3 h-14"
                />
              </FormControl>
              <Button
                type="button"
                onClick={onGenerateId}
                className="absolute right-4 h-9 px-6 text-[16px] leading-[1.5em] top-1/2 -translate-y-1/2"
              >
                Generate
              </Button>
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
                placeholder="Item Name"
                className="h-14 px-4 py-3"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
                Category
              </FormLabel>
              <div className="flex gap-2">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-14 px-4 py-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <Button
                      type="button"
                      className="w-full font-medium font-inter text-[16px] leading-[1.5em] text-[#94A3B8] bg-transparent hover:bg-transparent items-center gap-2 justify-start"
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
                Brand
              </FormLabel>
              <div className="flex gap-2">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-14 px-4 py-3">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <Button
                      type="button"
                      className="w-full font-medium font-inter text-[16px] leading-[1.5em] text-[#94A3B8] bg-transparent hover:bg-transparent items-center gap-2 justify-start"
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

      <div className="grid grid-cols-2 gap-5">
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
          name="stockUnit"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
                Stock of Units
              </FormLabel>
              <div className="flex gap-2">
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-14 px-4 py-3">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <Button
                      type="button"
                      className="w-full font-medium font-inter text-[16px] leading-[1.5em] text-[#94A3B8] bg-transparent hover:bg-transparent items-center gap-2 justify-start"
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
    </>
  );
};
