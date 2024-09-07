'use client';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, setLoading } from '@/app/redux/slices/authSlice';
import { RootState } from '@/app/redux/store';
import { setSessionStorageItem } from '@/utils/localStorage';

const FormSchema = z.object({
  Email: z.string().email({ message: 'Enter a valid email address' }),
  Password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

type UserFormValue = z.infer<typeof FormSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Use loading and authentication state from Redux store
  const { loading } = useSelector((state: RootState) => state.auth);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(FormSchema),
  });




  const onSubmit = async (data: UserFormValue) => {
    dispatch(setLoading(true)); 
    try {
      const response: any = await axios.post('http://localhost:3001/admin/employee/login', {
        Email: data.Email,
        Password: data.Password,
      });

      if (response.data.statusCode === 200) {
        const token = response.data.data;
        setSessionStorageItem('token', token);
        dispatch(loginSuccess(token)); // Dispatch Redux action
        router.push('/dashboard'); // Redirect after successful login
      } else {
        dispatch(setLoading(false)); 
        throw new Error('Invalid credentials'); // Handle unsuccessful login attempts
      }
    } catch (error: any) {
      dispatch(setLoading(false)); 
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Invalid credentials',
      });
    } 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="ml-auto w-full" type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </Form>
  );
}
