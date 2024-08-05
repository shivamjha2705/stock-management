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
import ReactSelect from 'react-select';
import { useState } from 'react';

export interface ComplaintManagement {
  complaintId: number;
  userId: number;
  customerName: string;
  complaintType: 'Delay' | 'Bad quality' | 'Wrong item' | 'Not reached';
  description: string;
  status: 'Active' | 'Inactive';
  resolution?: 'Coupon' | 'Store credits' | 'Add-on bag';
}

const complaintFormSchema = z.object({
  complaintId: z.number().nonnegative(),
  userId: z.number().nonnegative(),
  customerName: z.string(),
  complaintType: z.string(),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['Active', 'Inactive']),
  resolution: z.string(),
});

export const ReceivedComplaintForm: React.FC<{ initialData?: ComplaintManagement }> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const form = useForm<ComplaintManagement>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: initialData || {
      complaintId: 0,
      userId: 0,
      customerName: '',
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

  const customerOptions = [
    {
      id: '1',
      orderId: '101',
      empId: '1022',
      name: 'Alice Johnson',
      phoneNumber: '123-456-7890',
      // deliveryDate: '2023-07-17',
      // deliveryTimeSlot: '10am - 12pm',
      // deliveryStatus: 'Delivered',
      assignedEmployee: 'Deepak Singh',
      assignedRoutes: 'Route 1',
      bagOrdered: 'Regular Veggie Bag',
      totalWeightKg: 10,
      totalPriceInr: 779,
      addOns: 'Lemons',
      // paymentStatus: 'Paid',
      specialInstructions: 'Leave the package at the front door.',
    },
    {
      id: '2',
      orderId: '102',
      empId: '1023',
      name: 'Bob Brown',
      phoneNumber: '098-765-4321',
      // deliveryDate: '2023-07-18',
      // deliveryTimeSlot: '2pm - 4pm',
      // deliveryStatus: 'Pending',
      assignedEmployee: 'Jane Doe',
      assignedRoutes: 'Route 2',
      bagOrdered: 'Organic Fruit Bag',
      totalWeightKg: 5,
      totalPriceInr: 459,
      addOns: 'Bananas',
      // paymentStatus: 'Unpaid',
      specialInstructions: 'Ring the bell upon arrival.',
    },
    {
      id: '3',
      orderId: '103',
      empId: '1024',
      name: 'Deepak Singh',
      phoneNumber: '123-123-1234',
      // deliveryDate: '2023-07-19',
      // deliveryTimeSlot: '4pm - 6pm',
      // deliveryStatus: 'In Progress',
      assignedEmployee: 'John Smith',
      assignedRoutes: 'Route 3',
      bagOrdered: 'Mixed Greens Bag',
      totalWeightKg: 7,
      totalPriceInr: 569,
      addOns: 'Cucumbers',
      // paymentStatus: 'Paid',
      specialInstructions: 'Call before delivery.',
    }
  ];

  const complaintTypeOptions = [
    { value: 'Delay', label: 'Delay' },
    { value: 'Bad quality', label: 'Bad quality' },
    { value: 'Wrong item', label: 'Wrong item' },
    { value: 'Not reached', label: 'Not reached' },
  ];

  return (
    <div className="container mx-auto p-4">
      <Heading title={initialData ? 'Edit Complaint' : 'Create Complaint'} description="Fill in the details below" />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <Controller
              control={control}
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
                      onChange={(selected) => {
                        field.onChange(selected ? selected.name : '');
                        setSelectedCustomer(selected || null);
                      }}
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
              control={control}
              name="complaintType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complaint Type</FormLabel>
                  <FormControl>
                    <ReactSelect
                      isClearable
                      isSearchable
                      options={complaintTypeOptions}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      isDisabled={loading}
                      onChange={(selected) => field.onChange(selected ? selected.value : '')}
                      value={complaintTypeOptions.find(option => option.value === field.value)}
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

      {selectedCustomer && (
        <div className="mt-8">
          <Heading title="Customer Details" description="Details of the selected customer" />
          <Separator />
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Field</th>
                <th className="py-2 px-4 border">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border">Order ID</td>
                <td className="py-2 px-4 border">{selectedCustomer.orderId}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Employee ID</td>
                <td className="py-2 px-4 border">{selectedCustomer.empId}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Phone Number</td>
                <td className="py-2 px-4 border">{selectedCustomer.phoneNumber}</td>
              </tr>
              {/* <tr>
                <td className="py-2 px-4 border">Delivery Date</td>
                <td className="py-2 px-4 border">{selectedCustomer.deliveryDate}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Delivery Time Slot</td>
                <td className="py-2 px-4 border">{selectedCustomer.deliveryTimeSlot}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Delivery Status</td>
                <td className="py-2 px-4 border">{selectedCustomer.deliveryStatus}</td>
              </tr> */}
              <tr>
                <td className="py-2 px-4 border">Assigned Employee</td>
                <td className="py-2 px-4 border">{selectedCustomer.assignedEmployee}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Assigned Routes</td>
                <td className="py-2 px-4 border">{selectedCustomer.assignedRoutes}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Bag Ordered</td>
                <td className="py-2 px-4 border">{selectedCustomer.bagOrdered}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Total Weight (kg)</td>
                <td className="py-2 px-4 border">{selectedCustomer.totalWeightKg}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Total Price (₹)</td>
                <td className="py-2 px-4 border">{selectedCustomer.totalPriceInr}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Add-ons</td>
                <td className="py-2 px-4 border">{selectedCustomer.addOns}</td>
              </tr>
              {/* <tr>
                <td className="py-2 px-4 border">Payment Status</td>
                <td className="py-2 px-4 border">{selectedCustomer.paymentStatus}</td>
              </tr> */}
              <tr>
                <td className="py-2 px-4 border">Special Instructions</td>
                <td className="py-2 px-4 border">{selectedCustomer.specialInstructions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
