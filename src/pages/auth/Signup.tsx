import {
  Button,
  // buttonVariants
} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import authServices from '@/services/authServices';
import {
  // useEffect,
  useState,
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { SerializedError, unwrapResult } from '@reduxjs/toolkit';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/store/reducers/userReducer';
import { AppDispatch } from '@/store';
import Logo from '@/components/Logo';
import authServices from '@/services/authServices';

const formSchema = z.object({
  fullname: z
    .string()
    .min(4, {
      message: 'Tên phải dài ít nhất 4 kí tự.',
    })
    .max(256),
  email: z.string().email(),
  password: z
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

export default function Signup() {
  const [onSignup, setOnSignup] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
    },
  });

  const handleLogin = async (data: z.infer<typeof formSchema>) => {
    setOnSignup(true);
    await authServices
      .signup(data)
      .then((res) => {
        toast({
          title: 'Đăng kí thành công!',
          description: 'Trở về trang đăng nhập sau 2 giây',
        });
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch((err) => {
        toast({
          title: 'Đăng kí thất bại',
          // description: err.message,
        });
        setOnSignup(false);
      });
  };

  return (
    <div className="w-full p-10">
      <div className="flex justify-between md:block">
        <Logo className="h4 md:hidden" />
        <h4 className="flex justify-end">Đăng kí</h4>
      </div>
      <div className="flex h-full items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex h-full w-full flex-col justify-center space-y-2 sm:w-[350px]"
          >
            <h3 className="text-center">Đăng nhập vào tài khoản của bạn</h3>
            <p className="text-center text-muted-foreground">
              Nhập tên đầy đủ, email và mật khẩu để tạo tài khoản mới
            </p>
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đầy đủ</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Do Xuan Bach"
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
                      autoComplete="off"
                      placeholder="xuanbachdotdev@mail.com"
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
                    <div className="relative">
                      <Input
                        placeholder="Sup3rStr0nqP4ssw0rd"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full"
                        {...field}
                        autoComplete="password"
                      />
                      <span
                        className="absolute right-0 top-0 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-r-md hover:bg-muted"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5 blur-[2px]" />
                        )}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={onSignup}>
              Đăng kí
            </Button>
            <p className="text-center">
              Bạn đã có tài khoản?{' '}
              <Link to={'/login'} className="font-semibold hover:underline">
                Đăng nhập
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
