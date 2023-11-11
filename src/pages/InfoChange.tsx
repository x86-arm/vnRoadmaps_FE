import React from 'react';
import { useForm } from 'react-hook-form';

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
import { useToast } from '@/components/ui/use-toast';
import userServices from '@/services/userServices';

export default function InfoChange() {
  const { toast } = useToast();
  const [onLogin, setOnLogin] = React.useState(false);

  const form = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: {
    fullname: string;
    email: string;
    password: string;
  }) {
    setOnLogin(true);
    if (data.email == '' && data.fullname == '' && data.password == '') {
      toast({
        title: 'Vui lòng nhập ít nhất một trường',
      });
      setOnLogin(false);
    } else {
      userServices
        .updateUserData(data)
        .then(() => {
          toast({
            title: 'Thay đổi thông tin thành công!',
          });
          setOnLogin(false);
        })
        .catch(() => {
          toast({
            title: 'Thay đổi thông tin thất bại!',
          });
          setOnLogin(false);
        });
    }
  }

  return (
    <div className="w-full p-10">
      <div>
        <h2>
          Thay đổi thông tin
          <p className="mb-3 mt-2 text-base font-normal text-muted-foreground">
            Thay đổi những thông tin như email, mật khẩu, tên, số điện thoại
          </p>
        </h2>
      </div>
      <div className="flex h-full py-5 md:w-2/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-center space-y-4"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Đỗ Xuân Bách"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      type="email"
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
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Ab*1js(1sn#d"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={onLogin} className="w-fit">
              Thay đổi
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
