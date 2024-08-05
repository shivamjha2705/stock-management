'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash, CalendarIcon, Edit } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import ReactSelect from 'react-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface OrderManagementFormType {
  initialData: any | null;
}

const orderFormSchema = z.object({
  customerName: z.string().min(1, 'Customer Name is required'),
  employeeName: z.string().min(1, 'Employee Name is required'),
  subscriptionType: z.string().min(1, 'Subscription Type is required'),
  deliveryStartDate: z.date({
    required_error: "Delivery Date is required.",
  }),
  deliveryTimeSlot: z.string().min(1, 'Delivery Time Slot is required'),
  deliveryStatus: z.string(),
  bagOrdered: z.array(z.string()).min(1, 'Products Ordered is required'),
  totalWeight: z.number().positive('Total Weight must be greater than zero'),
  paymentStatus: z.string(),
  paymentType: z.string(),
  specialInstructions: z.string().optional(),
});

const dummyBags = [
  { value: 'Regular Veggie Bag', label: 'Regular Veggie Bag', weight: 4000 },
  { value: 'Mini Veggie Bag', label: 'Mini Veggie Bag', weight: 3000 },
  { value: 'Large Veggie Bag', label: 'Large Veggie Bag', weight: 5000 },
  { value: 'Veggie Bag', label: 'Veggie Bag', weight: 5000 }
];

export const CreateOrder: React.FC<OrderManagementFormType> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTimeSlotModalOpen, setIsTimeSlotModalOpen] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState('');
  const [timeSlots, setTimeSlots] = useState(['9:00 AM - 11:00 AM', '12:00 PM - 2:00 PM', '3:00 PM - 5:00 PM']);
  const title = initialData ? 'Edit Order' : 'Create New Order';
  const description = initialData ? 'Edit the Order details.' : 'To create a new Order, fill in the required information.';
  const toastMessage = initialData ? 'Order updated.' : 'Order created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    mode: 'onChange',
    defaultValues: {
      customerName: '',
      employeeName: '',
      subscriptionType: '',
      deliveryStartDate: new Date(),
      deliveryTimeSlot: '',
      deliveryStatus: 'Pending',
      bagOrdered: [] as string[],
      totalWeight: 0,
      paymentStatus: 'Pending',
      paymentType: '',
      specialInstructions: ''
    }
  });

  const { control, trigger, watch, handleSubmit, setValue, formState: { errors } } = form;

  const onSubmit: SubmitHandler<typeof orderFormSchema._type> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/orders/edit-order/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/orders/create-order`, data);
        // console.log("order", res);
      }
      // router.refresh();
      // router.push(`/dashboard/orders`);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storemployeeName}/orders/${params.orderId}`);
      // router.refresh();
      // router.push(`/${params.storemployeeName}/orders`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const orderedOptions = [
    { id: '1', name: 'Mini Veggie Bag' },
    { id: '2', name: 'Regular Veggie Bag' },
  ];

  const employeeOptions = [
    { id: '1', name: 'John Doe', phoneNumber: '123-456-7890' },
    { id: '2', name: 'Jane Smith', phoneNumber: '098-765-4321' },
  ];

  const customerOptions = [
    { id: '1', name: 'Alice Johnson', phoneNumber: '123-456-7890', assignedEmployee: { name: "John Doe", phoneNumber: '123-456-7890' } },
    { id: '2', name: 'Bob Brown', phoneNumber: '098-765-4321', assignedEmployee: { name: "Jane Smith", phoneNumber: '098-765-4321' } },
  ];

  const selectedCustomer = watch('customerName');

  useEffect(() => {
    const customer = customerOptions.find(option => option.name === selectedCustomer);
    if (customer) {
      setValue('employeeName', customer.assignedEmployee.name);
    } else {
      setValue('employeeName', '');
    }
  }, [selectedCustomer, setValue]);

  const addTimeSlot = () => {
    if (newTimeSlot && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots([...timeSlots, newTimeSlot]);
      setNewTimeSlot('');
    }
  };

  const deleteTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const subscriptionTypes = [
    { id: '1', name: 'Staples' },
    { id: '2', name: 'Regular Veggie' },
    { id: '3', name: 'Exotics Veggies' }
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="w-full gap-8 md:grid md:grid-cols-3">
            <>
              <Controller
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={customerOptions}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        isDisabled={loading}
                        onChange={(selected) => field.onChange(selected ? selected.name : '')}
                        value={customerOptions.find(option => option.name === field.value)}
                        filterOption={(candidate, input) => {
                          const customer = customerOptions.find(cust => cust.id === candidate.value);
                          return candidate.label.toLowerCase().includes(input.toLowerCase()) ||
                            (customer?.phoneNumber.includes(input) ?? false);
                        }}
                      />
                    </FormControl>
                    <FormMessage>{errors.customerName?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="subscriptionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Type</FormLabel>
                    <FormControl>
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={subscriptionTypes}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        isDisabled={loading}
                        onChange={(selected) => field.onChange(selected ? selected.name : '')}
                        value={subscriptionTypes.find(option => option.name === field.value)}
                      />
                    </FormControl>
                    <FormMessage>{errors.subscriptionType?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Subscription Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd MMM yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="deliveryTimeSlot"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Delivery Time Slot</FormLabel>
                      <Edit
                        onClick={() => setIsTimeSlotModalOpen(true)}
                        className="cursor-pointer text-red-500"
                        height={15}
                        width={15}
                      />
                    </div>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select Delivery Time Slot"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((slot, index) => (
                          <SelectItem key={index} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage>{errors.deliveryTimeSlot?.message}</FormMessage>
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Status</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select Payment Status"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Unpaid">Unpaid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
             

             <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Type</FormLabel>
                  <Controller
                    control={control}
                    name="paymentType"
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={[
                          { id: 'Upi', name: 'UPI' },
                          { id: 'Netbanking', name: 'Net Banking' },
                          { id: 'Credit/Debit', name: 'Credit/Debit' }
                        ]}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        isDisabled={loading}
                        onChange={(selected) => field.onChange(selected ? selected.id : '')}
                        value={[
                          { id: 'Upi', name: 'UPI' },
                          { id: 'Netbanking', name: 'Net Banking' },
                          { id: 'Credit/Debit', name: 'Credit/Debit' }
                        ].find(option => option.id === field.value)}
                      />
                    )}
                  />
                  <FormMessage>{errors.paymentType?.message}</FormMessage>
                </FormItem>
              )}
            /> 

            </>
          </div>
          <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        rows={5}
                        placeholder="Enter Special Instructions"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <div className="mt-8 flex justify-between">
            <Button
              type="submit"
              disabled={loading}
              // variant="primary"
              className="w-full"
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
      {initialData && (
        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex justify-between">
            <Heading
              title="Delete Order"
              description="This action cannot be undone."
            />
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              disabled={loading}
            >
              Delete Order
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isTimeSlotModalOpen} onOpenChange={(open) => !open && setIsTimeSlotModalOpen(false)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Delivery Time Slots</DialogTitle>
            <DialogDescription>Add or remove delivery time slots</DialogDescription>
          </DialogHeader>
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeSlots.map((slot, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{slot}</td>
                    <td className="px-6 flex justify-end py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Trash onClick={() => deleteTimeSlot(index)} className="cursor-pointer text-red-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex mt-4">
              <Input
                type="text"
                placeholder="Add new time slot"
                value={newTimeSlot}
                onChange={(e) => setNewTimeSlot(e.target.value)}
              />
              <Button onClick={addTimeSlot} className="ml-2">
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
