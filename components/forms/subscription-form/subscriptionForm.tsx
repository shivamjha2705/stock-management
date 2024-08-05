'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';

import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Edit, Trash } from 'lucide-react';
import ReactSelect from 'react-select';
import { MultiSelect } from '@/components/ui/MultiSelect';

const subscriptionFormSchema = z.object({
  subscriptionType: z.string(),
  SubscriptionImage: z.object({}).optional(),
  description: z.string(),
  visibility: z.string().min(1, 'Visibility is required'),
  totalDelivery: z.number().positive('Total bags must be greater than zero'),
  frequency: z.string(),
  deliveryDays: z.array(z.string()).min(1, 'Delivery Days is required'),
  subscriptionStartDate: z.string().min(1, 'Subscription Start Date is required'),
  subscriptionEndDate: z.string().min(1, 'Subscription End Date is required'),
  bagName: z.array(z.string()).min(1, 'Bag Name is required'),
  subscriptionStatus: z.enum(['Active', 'Inactive']),
  price: z.number().positive('Price must be greater than zero'),
  netPrice: z.any(),
  offers: z.number()
}).refine((data) => data.totalDelivery % subscriptionTypeNumbers[data.subscriptionType] === 0, {
  message: 'Total bags must be a multiple of the associated subscription type',
  path: ['totalDelivery'],
});

const visibilityOption = [
  { id: '1', name: 'Admin' },
  { id: '2', name: 'Public' }
];
type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

interface SubscriptionFormType {
  initialData: any | null;
}

const subscriptionTypeNumbers: { [key: string]: number } = {
  Trial: 1,
  Monthly: 4,
  Quarterly: 12,
  'Semi-Annual': 24,
  Annually: 48
};
const frequencyTypeNumbers: { [key: string]: number } = {
  Daily: 1,
  Weekly: 1,
  Monthly: 1 / 4,
  Fortnightly: 1 / 2,
  Biweekly: 2
};

const deliveryDaysOptions = [
  { id: '1', name: 'Monday' },
  { id: '2', name: 'Tuesday' },
  { id: '3', name: 'Wednesday' },
  { id: '4', name: 'Thursday' },
  { id: '5', name: 'Friday' },
  { id: '6', name: 'Saturday' },
  { id: '7', name: 'Sunday' }
];

const dummyBags = [
  { value: 'Regular Veggie Bag', label: 'Regular Veggie Bag', weight: 4000 },
  { value: 'Mini Veggie Bag', label: 'Mini Veggie Bag', weight: 3000 },
  { value: 'Large Veggie Bag', label: 'Large Veggie Bag', weight: 5000 },
  { value: 'Veggie Bag', label: 'Veggie Bag', weight: 5000 }
];

export const CreateSubscriptionForm: React.FC<SubscriptionFormType> = ({
  initialData
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Subscription' : 'Create New Subscription';
  const description = initialData
    ? 'Edit the subscription details below.'
    : 'To create a new subscription, fill in the basic information below.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    mode: 'onChange',
    defaultValues: {
      subscriptionType: initialData?.subscriptionType || 'Trial',
      frequency: initialData?.frequency || 'Weekly',
      price: initialData?.price || 0,
      totalDelivery: initialData?.totalDelivery || 1,
      offers: initialData?.offers || 0,
      netPrice: initialData?.netPrice || 0,
      deliveryDays: initialData?.deliveryDays || [],
      bagName: initialData?.bagName || [],
      subscriptionStatus: initialData?.subscriptionStatus || 'Active',
      subscriptionStartDate: initialData?.subscriptionStartDate || '',
      subscriptionEndDate: initialData?.subscriptionEndDate || '',
    }
  });

  const { handleSubmit, control, watch, setValue, formState: { errors } } = form;

  const onSubmit: SubmitHandler<SubscriptionFormValues> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // Handle edit logic here
      } else {
        // Handle create logic here
      }
      router.refresh();
      router.push(`/dashboard/subscriptions`);
    } catch (error: any) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };


  const price = watch('price');
  // useEffect(() => {
  //   const netPrice = price - (price * (offers / 100));
  //   setValue('netPrice', parseFloat(netPrice.toFixed(2)));
  // }, [price, offers, setValue]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
     
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className="gap-8 md:grid md:grid-cols-3">
        
        
                  <Controller
  control={form.control}
  name="bagName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Select Bags</FormLabel>
      <FormControl>
        <ReactSelect
          isClearable
          isSearchable
          options={dummyBags}
          formatOptionLabel={(option) => (
            <div className="flex justify-between items-center">
              <span>{option.label}</span>
              <span className=" ms-4 text-green-700">{option.weight}g</span>
            </div>
          )}
          onChange={(selected) => {
            field.onChange(selected ? selected.map(option => option.value) : []);
          }}
          value={dummyBags.filter(option => field.value.includes(option.value))}
          isMulti
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
            <Controller
              control={form.control}
              name="deliveryDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Days</FormLabel>
                  <FormControl>
                    <MultiSelect
                      value={field.value || []}
                      onChange={(value) => field.onChange(value)}
                      options={deliveryDaysOptions}
                      disabled={loading}
                      placeholder="Select Delivery Days"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

    

          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
