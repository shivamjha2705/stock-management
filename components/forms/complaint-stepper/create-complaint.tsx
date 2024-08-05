'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export interface ComplaintManagement {
  complaintId: number;
  userId: number;
  complaintType: 'Delay' | 'Bad quality' | 'Wrong item' | 'Not reached';
  description: string;
  status: 'Active' | 'Inactive';
  resolution?: 'Coupon' | 'Store credits' | 'Add-on bag';
}

const complaintFormSchema = z.object({
  complaintId: z.number().nonnegative(),
  userId: z.number().nonnegative(),
  complaintType: z.string(),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['Active', 'Inactive']),
  resolution: z.string(),
});

export const ComplaintForm: React.FC<{ initialData?: ComplaintManagement }> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ComplaintManagement>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: initialData || {
      complaintId: 0,
      userId: 0,
      complaintType: 'Delay',
      description: '',
      status: 'Active',
      resolution: undefined,
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<ComplaintManagement> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update existing complaint
      } else {
        // Create new complaint
      }
      // Refresh or redirect after submission
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Heading title={initialData ? 'Edit Complaint' : 'Create Complaint'} description="Fill in the details below" />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* <FormField
              control={control}
              name="complaintId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complaint ID</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="Enter Complaint ID" {...field} />
                  </FormControl>
                  <FormMessage>{errors.complaintId?.message}</FormMessage>
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={loading} placeholder="Enter User ID" {...field} />
                  </FormControl>
                  <FormMessage>{errors.userId?.message}</FormMessage>
                </FormItem>
              )}
            /> */}
     <FormField
  control={control}
  name="complaintType"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Complaint Type</FormLabel>
      <FormControl>
        <Input 
          disabled={loading} 
          onChange={field.onChange} 
          value={field.value} 
          placeholder="Enter Complaint Type" 
        />
      </FormControl>
      <FormMessage>{errors.complaintType?.message}</FormMessage>
    </FormItem>
  )}
/>


            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.status?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* <FormField
              control={control}
              name="resolution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolution</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Coupon">Coupon</SelectItem>
                        <SelectItem value="Store credits">Store credits</SelectItem>
                        <SelectItem value="Add-on bag">Add-on bag</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.resolution?.message}</FormMessage>
                </FormItem>
              )}
            /> */}

<FormField
  control={control}
  name="resolution"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Resolution</FormLabel>
      <FormControl>
        <Input 
          disabled={loading} 
          onChange={field.onChange} 
          value={field.value} 
          placeholder="Enter Resolution" 
        />
      </FormControl>
      <FormMessage>{errors.resolution?.message}</FormMessage>
    </FormItem>
  )}
/>

          </div>
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="text" disabled={loading} placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage>{errors.description?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {initialData ? 'Save Changes' : 'Create Complaint'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
