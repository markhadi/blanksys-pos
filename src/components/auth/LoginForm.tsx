import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormType, loginFormSchema } from '@/types/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (values: LoginFormType) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: LoginFormType) => {
    try {
      setIsLoading(true);
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-7"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#252525] text-[16px] leading-[1.2em] font-roboto">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  {...field}
                  disabled={isLoading}
                  className="placeholder:text-[#DDDDDD] text-[16px] leading-[1.2em] font-roboto border-[#DDDDDD] px-2 py-5 h-min"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#252525] text-[16px] leading-[1.2em] font-roboto">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  {...field}
                  disabled={isLoading}
                  className="placeholder:text-[#DDDDDD] text-[16px] leading-[1.2em] font-roboto border-[#DDDDDD] px-2 py-5 h-min"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1E293B] text-white text-[16px] font-roboto leading-[1.2em] h-[62px] p-2 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </Form>
  );
};
