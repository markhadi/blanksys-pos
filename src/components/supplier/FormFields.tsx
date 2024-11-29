import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormFieldsProps {
  form: UseFormReturn<{
    supplierName: string;
    contact: string;
    address: string;
  }>;
}

export const FormFields = ({ form }: FormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="supplierName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
              Supplier Name
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="PT. ABC" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
              Contact
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="+6281234567890" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
              Address
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Jl. Raya No. 1" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
