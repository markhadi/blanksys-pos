import { UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CustomerFormData } from '@/types/order';

interface OrderFormProps {
  form: UseFormReturn<CustomerFormData>;
  onSubmit: (data: CustomerFormData) => void;
  children?: React.ReactNode;
}

export const OrderForm = ({ form, onSubmit, children }: OrderFormProps) => (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <FormField
        control={form.control}
        name="customerName"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Customer Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter customer name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Add note (optional)" />
            </FormControl>
          </FormItem>
        )}
      />
      {children}
    </form>
  </Form>
);
