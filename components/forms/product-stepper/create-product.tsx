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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ReactSelect from 'react-select';
import { Textarea } from "@/components/ui/textarea";

// Icons
import { Trash, Edit } from 'lucide-react';

// Validation And Forms
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';


import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';


// Create a
interface ProductFormType {
  initialData: any | null;
}

const productFormSchema = z.object({
  productName: z.string().min(1, 'Product Name is required'),
  description: z.string().min(1, 'Description is required'),
  productImage: z.object({}).optional(),
  available: z.string().min(1, 'Please Enter availability'),
  type: z.string().min(1, 'Type is required'),
  unitQuantity: z.number().positive('Unit Quantity must be greater than zero'),
});


export type ProductFormValues = z.infer<typeof productFormSchema>;









export const CreateProductForm: React.FC<ProductFormType> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeModalOpen, setTypeModalOpen] = useState(false);

  const [types, setTypes] = useState([
    { value: 'Staples', label: 'Staples' },
    { value: 'Regular Veggie', label: 'Regular Veggie' },
    { value: 'Exotics Veggies', label: 'Exotics Veggies' },
    { value: 'Salads', label: 'Salads' },
    { value: 'Exotic Salads', label: 'Exotic Salads' },
    { value: 'Add Ons', label: 'Add Ons' },
  ]);
  const [newType, setNewType] = useState('');



// Setting  
  const title = initialData ? 'Edit Item' : 'Create New Item';
  const description = initialData
    ? 'Edit Item details.'
    : 'To create a new Items, fill in the required information.';
  const toastMessage = initialData ? 'Item updated.' : 'Item created.';
  const action = initialData ? 'Save changes' : 'Create';



  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: 'onChange',
  });

  

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = form;



  const onSubmit = async (data: ProductFormValues) => {
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



  const addType = () => {
    if (newType.trim()) {
      setTypes([...types, { value: newType, label: newType }]);
      setNewType('');
    }
  };
  const deleteType = (typeToDelete: string) => {
    setTypes(types.filter(type => type.value !== typeToDelete));
  };



  return (
    <>
      <Dialog open={typeModalOpen} onOpenChange={setTypeModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Types</DialogTitle>
            <DialogDescription>Add or remove product types.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between">
            <Input
              placeholder="New Type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
            <Button className='ms-3' onClick={addType}>Add</Button>
            </div>
            <div className="space-y-2">
              {types.map((type) => (
                <div key={type.value} className="flex justify-between items-center">
                  <span>{type.label}</span>
                  <Button variant="destructive" onClick={() => deleteType(type.value)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setTypeModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    

  

   

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

          <div className="relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3">

            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Item Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Type</FormLabel>
                    <Edit className="text-red-500 ms-1" height={15} width={15} onClick={() => setTypeModalOpen(true)}/>
                  </div>
                  <FormControl>
                    <ReactSelect
                      // isSearchable
                      options={types}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      isDisabled={loading}
                      onChange={(selected) => field.onChange(selected ? selected.value : '')}
                      // value={types.find(option => option.value === field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            



<FormField
              control={form.control}
              name="unitQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Quantity (gms)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Enter Unit Quantity"
                      onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Availability</FormLabel>
                  <FormControl>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Unavailable">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.available?.message}</FormMessage>
                </FormItem>
              )}
            />
           
            <Controller
              name="productImage"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      disabled={form.formState.isSubmitting}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  {errors.productImage && <FormMessage>{errors.productImage.message}</FormMessage>}
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    rows={5}
                    placeholder="Enter Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
      {initialData && (
        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex justify-between">
            <Heading
              title="Delete Product"
              description="This action cannot be undone."
            />
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              disabled={loading}
            >
              Delete Product
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
