'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import ReactSelect from 'react-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface EmployeeFormType {
  initialData: any | null;
  userOptions: { id: string; name: string; phoneNo: string }[]; // List of users to assign
}

const employeeFormSchema = z.object({
  employeeId: z.number().nonnegative().optional(),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  role: z.string().min(1, 'Role is required'),
  contactInformation: z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    phone: z.string().min(1, 'Phone is required'),
  }),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  address: z.string().min(1, 'Address is required'),
  gender: z.string().min(1, 'Gender is required'),
  dob: z.date({
    required_error: 'Date of Birth is required.',
  }),
  assignedUsers: z.array(z.string()).optional(),
});

export const CreateEmployeeForm: React.FC<EmployeeFormType> = ({ initialData, userOptions }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: initialData || {
      employeeId: undefined,
      firstName: '',
      lastName: '',
      role: '',
      contactInformation: {
        email: '',
        phone: '',
      },
      dob: new Date(),
      assignedUsers: [],
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  const onSubmit: SubmitHandler<typeof employeeFormSchema._type> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update existing employee
      } else {
        // Create new employee
      }
      // Refresh or redirect after submission
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderErrorMessage = (error: any) => {
    if (!error) return null;
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return null;
  };

  const filterOption = (option: any, inputValue: string) => {
    const user = userOptions.find((user) => user.id === option.value);
    return (
      option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      (user && user.phoneNo.includes(inputValue))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Heading title={initialData ? 'Edit Employee' : 'Create Employee'} description="Fill in the details below" />
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Enter First Name" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.firstName)}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Enter Last Name" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.lastName)}</FormMessage>
                </FormItem>
              )}
            />
               <FormField
              control={control}
              name="contactInformation.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Enter Phone" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.contactInformation)}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="contactInformation.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={loading} placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.contactInformation)}</FormMessage>
                </FormItem>
              )}
            />
         
            <FormField
              control={control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "dd MMM yyyy") : <span>Pick a date</span>}
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
                  <FormMessage>{renderErrorMessage(errors.dob)}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.gender)}</FormMessage>
                </FormItem>
              )}
            />
           
           
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Enter Street Address" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.address)}</FormMessage>
                </FormItem>
              )}
            />
             
             <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Enter City" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.city)}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Enter State" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.state)}</FormMessage>
                </FormItem>
              )}
            />
            {/* Uncomment the below code to enable Assigned Users */}
            {/* <FormField
              control={control}
              name="assignedUsers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Users<span className='ms-1 text-red-500' style={{ fontSize: "14px" }} >(Can be searched by phone number)</span></FormLabel>
                  <FormControl>
                    <Controller
                      control={control}
                      name="assignedUsers"
                      render={({ field }) => (
                        <ReactSelect
                          isMulti
                          isClearable
                          isSearchable
                          options={userOptions.map((option) => ({
                            value: option.id,
                            label: option.name,
                          }))}
                          value={userOptions.filter((option) =>
                            field.value.includes(option.id)
                          ).map(option => ({ value: option.id, label: option.name }))}
                          onChange={(selected) => {
                            field.onChange(selected ? selected.map(option => option.value) : []);
                          }}
                          filterOption={filterOption}
                          placeholder="Select Assigned Users"
                          isDisabled={loading}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.assignedUsers)}</FormMessage>
                </FormItem>
              )}
            /> */}
            <FormField
              control={control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input type="text" disabled={loading} placeholder="Enter Role" {...field} />
                  </FormControl>
                  <FormMessage>{renderErrorMessage(errors.role)}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {initialData ? 'Save Changes' : 'Create Employee'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
