'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Edit, Trash, Trash2Icon, TrashIcon } from "lucide-react";
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
import apiCall from "@/lib/axios";
import { ToastAtTopRight } from "@/lib/sweetAlert";

interface ProfileFormType {
  initialData: any | null;
  isDisabled?: boolean;
}


const FormSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email format"),
  phone_no: z.string().min(1, "Contact Number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, 'State is required'),
  zip_code: z.string().min(1, 'Zipcode is required'),
  gstin: z.string().min(1, 'Zipcode is required'),
  client_type: z.string().min(1, "Type of Customer is required"),
  category: z.string().min(1, 'House and Floor Number is required'),
});

export const CreateProfileOne: React.FC<{ initialData?: any ,isDisabled?:boolean}> = ({
  initialData,
  isDisabled,
}) => {
  const params = useParams();
  console.log(params)
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = (isDisabled && initialData) ? 'View Customer' :(isDisabled===false && initialData)? 'Edit Customer':"Create Customer"
  const description=(isDisabled && initialData) ? 'Details of Customer' :(isDisabled===false && initialData)? 'Edit the details below ':"Fill the details below" ;
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";

  console.log(initialData)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: initialData?.first_name || "",
      last_name: "",
      email: "",
      phone_no: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      gstin: "",
      client_type: "",
      category: "",
    },
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
        
        const res=   await apiCall('PUT', '/customers',data)        
        if(res?.customer_id){
         ToastAtTopRight.fire({
           icon: 'success',
           title: 'Customer updated',
         });
        }

      } else {
     
       const res=   await apiCall('POST', '/customers',data)        
       console.log(res)
       if(res?.customer_id){
        ToastAtTopRight.fire({
          icon: 'success',
          title: 'Customer created',
        });
       }
       form.reset()
      }
    } catch (error: any) {
      console.log(error)
      ToastAtTopRight.fire({
        icon: 'error',
        title: error?.message || 'Something wents wrong',
      });
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


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />



      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input disabled={isDisabled||loading} placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage>{errors.first_name?.message}</FormMessage>
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
                    <Input disabled={isDisabled||loading} placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage>{errors.last_name?.message}</FormMessage>
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
                      disabled={isDisabled||loading}
                      placeholder="johndoe@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your contact number"
                      disabled={isDisabled||loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.phone_no?.message}</FormMessage>
                </FormItem>
              )}
            />
          
        
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.address?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>city</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter city"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.city?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter state"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.state?.message}</FormMessage>
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter Zipcode"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.zip_code?.message}</FormMessage>
                </FormItem>
              )}
            />
        
            
            <FormField
              control={form.control}
              name="gstin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GSTIN</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter gstin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.gstin?.message}</FormMessage>
                </FormItem>
              )}
            />
    
     
            <FormField
              control={form.control}
              name="client_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter client type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.client_type?.message}</FormMessage>
                </FormItem>
              )}
            />
    
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isDisabled||loading}
                      placeholder="Enter category"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{errors.category?.message}</FormMessage>
                </FormItem>
              )}
            />
    
     



          </div>
        
          <div className="mt-8 pt-5">
            <div className="flex justify-end">
            {isDisabled===false && <Button type="submit" disabled={isDisabled||loading}>
            { initialData? 'Save Customer':"Create Customer"}     
            </Button>}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
