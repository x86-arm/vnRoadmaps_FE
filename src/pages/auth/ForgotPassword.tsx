import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import authServices from '@/services/authServices';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email({
    message: 'Bắt buộc cần có email!',
  }),
  // .min(4, {
  //   message: 'Email quá ngắn!',
  // })
  // .max(256),
});

export default function ForgotPassword() {
  const [onForgotPassword, setOnForgotPassword] =
    React.useState<boolean>(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] =
    React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleForgotPassword = async (data: z.infer<typeof formSchema>) => {
    setOnForgotPassword(true);
    await authServices
      .forgotPassword(data)
      .then(() => {
        setForgotPasswordSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Lấy lại mật khẩu thất bại',
          description: err?.response.data.message || 'Lỗi',
        });
        setOnForgotPassword(false);
      });
  };


  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-5">
      {!forgotPasswordSuccess ? (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleForgotPassword)}
              className="flex h-full w-full flex-col justify-center space-y-2 sm:w-[520px]"
            >
              <h2 className="text-center">Quên mật khẩu</h2>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="xuanbach@mail.com"
                        {...field}
                        autoComplete="email"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={onForgotPassword}
                className="w-full"
              >
                Lấy lại mật khẩu
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <h2>Vui lòng kiểm tra hộp thư email của bạn để lấy lại mật khẩu🎉🔑</h2>
      )}
    </div>
  );
}
