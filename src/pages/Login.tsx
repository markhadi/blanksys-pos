import '@/styles/login.css';
import logoTitle from '@/assets/images/Logo-and-Title.png';
import loginImg from '@/assets/images/img-login.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(3, 'Username min 3 characters'),
  password: z.string().min(6, 'Password min 6 characters'),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container-login">
      <div className="image hidden 2xl:flex">
        <img src={logoTitle} alt="logo-title" className="flex-shrink-0" />
        <img
          src={loginImg}
          alt="login-image"
          className="max-w-[911px] w-full flex-shrink-0 aspect-square"
        />
        <span className="text-[#64748B] leading-[1.2em]">
          system by Blankpoint.net
        </span>
      </div>

      <div className="login-form hidden 2xl:flex">
        <div className="text-[#1E293B] space-y-7 w-full">
          <div className="h-8">
            <h1 className="text-[42px] leading-[1.2em]">Sign in</h1>
          </div>

          <p className="leading-[1.2em]">
            Welcome to Blanksys point of sales system. Please sign in to use
            system
          </p>
        </div>

        <div className="h-16 w-full"></div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                      className="placeholder:text-[#DDDDDD] text-[16px] leading-[1.2em] font-roboto border-[#DDDDDD] px-2 py-5 h-min"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#1E293B] text-white text-[16px] font-roboto leading-[1.2em] h-[62px] p-2"
            >
              Sign in
            </Button>
          </form>
        </Form>

        <div className="h-[129px] w-full"></div>
      </div>

      <div className="image p-6 flex 2xl:hidden">
        <div className="flex flex-col gap-7 items-center justify-center max-w-[480px] mx-auto w-full bg-white shadow-lg rounded-lg p-10">
          <img src={logoTitle} alt="logo-title" className="flex-shrink-0" />

          <div className="text-[#1E293B] text-center space-y-7 w-full">
            <div className="h-8">
              <h1 className="text-[42px] leading-[1.2em]">Sign in</h1>
            </div>

            <p className="leading-[1.2em]">
              Welcome to Blanksys point of sales system. Please sign in to use
              system
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
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
                        className="placeholder:text-[#DDDDDD] text-[16px] leading-[1.2em] font-roboto border-[#DDDDDD] px-2 py-5 h-min"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#1E293B] text-white text-[16px] font-roboto leading-[1.2em] h-[62px] p-2"
              >
                Sign in
              </Button>
            </form>
          </Form>

          <span className="text-[#64748B] leading-[1.2em]">
            system by Blankpoint.net
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
