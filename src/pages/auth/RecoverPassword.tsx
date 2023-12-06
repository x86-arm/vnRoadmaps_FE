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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Navigate, useSearchParams } from 'react-router-dom';

const formSchema = z.object({
  newPassword: z
    .string()
    .regex(
      new RegExp('.*[A-Z].*'),
      'Mật khẩu phải có ít nhất một chữ cái viết hoa!'
    )
    .regex(
      new RegExp('.*[a-z].*'),
      'Mật khẩu phải có ít nhất một chữ cái viết thường!'
    )
    // .regex(new RegExp('.*\\d.*'), 'Mật khẩu phải có ít nhất một chữ số!')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'Mật khẩu phải có ít nhất một kí tự đặc biệt'
    )
    .min(8, {
      message: 'Mật khẩu phải dài ít nhất 8 kí tự.',
    })
    .max(256),
});

export default function RecoverPassword() {
  const [onForgotPassword, setOnForgotPassword] =
    React.useState<boolean>(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] =
    React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
    },
  });

  const [searchParams] = useSearchParams();
  const reqID = searchParams.get('reqID');

  if (!reqID) {
    return <Navigate to={'/404'}></Navigate>;
  }

  const handleForgotPassword = async (data: z.infer<typeof formSchema>) => {
    setOnForgotPassword(true);
    await authServices
      .recoverPassword({ ...data, reqID })
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
              <h2 className="text-center">Đổi mật khẩu mới</h2>
              <FormField
                control={form.control}  
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="SuperStrongNewPassword"
                        {...field}
                        autoComplete="new-password"
                        type="password"
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
                Đổi mật khẩu
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <h2>Lấy lại mật khẩu thành công🎉</h2>
      )}
    </div>
  );
}
