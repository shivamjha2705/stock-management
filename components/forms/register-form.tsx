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
import { setLoading } from '@/app/redux/slices/authSlice';
import { RootState } from '@/app/redux/store';

const FormSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  username: z.string().min(1, { message: 'Username is required' }),
  email_id: z.string().email({ message: 'Enter a valid email address' }),
  login_password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

type UserFormValue = z.infer<typeof FormSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Use loading state from Redux store
  const { loading } = useSelector((state: RootState) => state.auth);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: UserFormValue) => {  // Ensure 'data' is correctly typed
    dispatch(setLoading(true));
    try {
      const response: any = await axios.post('http://localhost:4000/api/admins/signup', {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email_id: data.email_id,
        login_password: data.login_password,
      });

      if (response.data.statusCode === 201) { // Assuming 201 is the success code for registration
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Registration successful!',
        });
        router.push('/auth/login'); // Redirect to login page
      } else {
        dispatch(setLoading(false));
        throw new Error('Registration failed'); // Handle unsuccessful registration attempts
      }
    } catch (error: any) {
      dispatch(setLoading(false));
      ToastAtTopRight.fire({
        icon: 'error',
        title: error.response?.data?.message || 'Registration failed',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your first name..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your last name..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email_id"
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
          name="login_password"
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
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Form>
  );
}