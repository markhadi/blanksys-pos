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
  form: UseFormReturn<{ categoryName: string }>;
}

export const FormFields = ({ form }: FormFieldsProps) => {
  return (
    <FormField
      control={form.control}
      name="categoryName"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-medium font-inter text-black text-[16px] leading-[1.5em]">
            Category Name
          </FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
