'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Edit, Trash } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ReactSelect from 'react-select';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileFormType {
  initialData: any | null;
  categories: any;
}

const FormSchema = z.object({
  firstname: z.string().min(1, "First Name is required"),
  lastname: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  contactno: z.string().min(1, "Contact Number is required"),
  address2: z.string().optional(),
  assignedEmployee: z.string().optional(),
  subscriptionType: z.string().min(1, "Subscription Type is required"),
  subscriptionStartDate: z.date({
    required_error: "Subscription Start Date is required.",
  }),
  paymentType: z.string().min(1, "Payment Type is required"),
  gender: z.string().min(1, 'Gender is required'),
  age: z.string().min(1, 'Age is required'),
  street: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, 'State is required'),
  zipcode: z.string().min(1, 'Zipcode is required'),
  houseNumber: z.string().min(1, 'House Number is required'),
  society: z.string().min(1, 'Society is required'),
  dob: z.date({
    required_error: "Date of Birth is required."
  }),
});

export const CreateProfileOne: React.FC<ProfileFormType> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? "Edit Customer" : "Create Customer";
  const description = initialData
    ? "Edit a product."
    : "To create new Customer, we first need some basic information about Customer.";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const processForm = (data: z.infer<typeof FormSchema>) => {
    // api call and reset
    // form.reset();
  };

  const employees = [
    { id: "employee1", name: "John Doe", phoneNumber: "123-456-7890" },
    { id: "employee2", name: "Jane Smith", phoneNumber: "098-765-4321" },
    // Add more employees as needed
  ];

  const subscriptionTypes = [
    { id: "Staples", name: "Basic" },
    { id: "Veggies", name: "Premium" },
    { id: "Beans", name: "VIP" },
    { id: "Gourds", name: "VIP" },
    { id: "Beans", name: "VIP" },
    { id: "Beans", name: "VIP" },
    { id: "Beans", name: "VIP" },
  ];

  const [cityOptions, setCityOptions] = useState([
    { id: "Gurgaon", name: "Gurgaon" },
    { id: "Delhi", name: "Delhi" },
    { id: "Noida", name: "Noida" },
    { id: "Faridabad", name: "Faridabad" },
    { id: "Ghaziabad", name: "Ghaziabad" },
    { id: "Sahibabad", name: "Sahibabad" },
  ]);

  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [newCity, setNewCity] = useState('');

  const openCityModal = () => {
    setIsCityModalOpen(true);
  };

  const closeCityModal = () => {
    setIsCityModalOpen(false);
  };

  const addCity = () => {
    if (newCity) {
      setCityOptions([...cityOptions, { id: newCity.toLowerCase(), name: newCity }]);
      setNewCity('');
    }
  };

  const deleteCity = (index: number) => {
    setCityOptions(cityOptions.filter((_, i) => i !== index));
  };

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
      <Dialog open={isCityModalOpen} onOpenChange={(open) => !open && closeCityModal()}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Manage Cities</DialogTitle>
            <DialogDescription>You can manage cities here.</DialogDescription>
          </DialogHeader>
          <div>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-red-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    City
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {cityOptions.map((city, cityIndex) => (
                  <tr key={cityIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {city.name}
                    </td>
                    <td className="px-6 flex justify-end py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Trash onClick={() => deleteCity(cityIndex)} className="cursor-pointer text-red-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex mt-4">
              <Input
                type="text"
                placeholder="Add new city"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
              />
              <Button onClick={addCity} className="ml-2">
                Add
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(processForm)}
          className="w-full space-y-8"
        >
          <div className="relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage>{errors.firstname?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage>{errors.lastname?.message}</FormMessage>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="contactno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your contact number"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.contactno?.message}</FormMessage>
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
                      disabled={loading}
                      placeholder="johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
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
                  <FormMessage>{errors.dob?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
                  <FormMessage>{errors.gender?.message}</FormMessage>
                </FormItem>
              )}
            />
           
           
          
            
            <FormField
              control={form.control}
              name="houseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter House Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.houseNumber?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="society"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Society</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Society"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.society?.message}</FormMessage>
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Sector"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.address2?.message}</FormMessage>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <div className="flex mt-2">
                    <FormLabel>City</FormLabel>
                    <Edit onClick={openCityModal} className="ms-3 cursor-pointer text-red-500" height={15} width={15} />
                  </div>
                  <Controller
                    control={control}
                    name="city"
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={cityOptions}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        isDisabled={loading}
                        onChange={(selected) => field.onChange(selected ? selected.id : '')}
                        value={cityOptions.find(option => option.id === field.value)}
                      />
                    )}
                  />
                  <FormMessage>{errors.city?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignedEmployee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Employee</FormLabel>
                  <Controller
                    control={control}
                    name="assignedEmployee"
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={employees}
                        getOptionLabel={(option) => option.name} // Only display the employee name
                        getOptionValue={(option) => option.id}
                        isDisabled={loading}
                        onChange={(selected) => field.onChange(selected ? selected.id : '')}
                        value={employees.find(option => option.id === field.value)}
                        filterOption={(candidate, input) => {
                          const employee = employees.find(emp => emp.id === candidate.value);
                          return candidate.label.toLowerCase().includes(input.toLowerCase()) ||
                            (employee?.phoneNumber.includes(input) ?? false);
                        }} // Custom filter logic to search by phone number
                      />
                    )}
                  />
                  <FormMessage>{errors.assignedEmployee?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="subscriptionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Type</FormLabel>
                  <Controller
                    control={control}
                    name="subscriptionType"
                    render={({ field }) => (
                      <ReactSelect
                        isClearable
                        isSearchable
                        options={subscriptionTypes}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option.id}
                        isDisabled={loading}
                        onChange={(selected) => field.onChange(selected ? selected.id : '')}
                        value={subscriptionTypes.find(option => option.id === field.value)}
                      />
                    )}
                  />
                  <FormMessage>{errors.subscriptionType?.message}</FormMessage>
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="subscriptionStartDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel id="dateFormat" >Subscription Start Date</FormLabel>
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
            /> */}
          </div>
          <div className="mt-8 pt-5">
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="px-7 bg-green-700 text-white"
              >
                {action}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
