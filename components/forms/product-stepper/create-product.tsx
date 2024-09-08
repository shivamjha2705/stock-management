'use client';

// import axios from '@/lib/axios';
import apiCall from '@/lib/axios';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ReactSelect from 'react-select';
import { Textarea } from '@/components/ui/textarea';

// Icons
import { Trash, Edit } from 'lucide-react';

// Validation And Forms
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

// Create a
interface ProductFormType {
  initialData: any | null;
}

const productFormSchema = z.object({
  productName: z.string().min(1, 'Product Name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Product Description is required'),
  sku: z.string().min(1, 'SKU is required'),
  costPerUnit: z.number().positive('Cost per unit must be greater than zero'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const CreateProductForm: React.FC<ProductFormType> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeModalOpen, setTypeModalOpen] = useState(false);

  const [categories, setCategories] = useState([
    { value: 'Staples', label: 'Staples' },
    { value: 'Regular Veggie', label: 'Regular Veggie' },
    { value: 'Exotic Veggies', label: 'Exotic Veggies' },
    { value: 'Salads', label: 'Salads' },
    { value: 'Exotic Salads', label: 'Exotic Salads' },
    { value: 'Add Ons', label: 'Add Ons' },
  ]);
  const [newCategory, setNewCategory] = useState('');

  const title = initialData ? 'Edit Item' : 'Create New Item';
  const description = initialData
    ? 'Edit item details.'
    : 'To create a new item, fill in the required information.';
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
      const formattedData = {
        product_name: data.productName,
        category: data.category,
        product_description: data.description,
        sku: data.sku,
        cost_price_per_unit: data.costPerUnit,
      };

      if (initialData) {
        // If you're editing an existing product
        await apiCall('put', `/products/${initialData._id}`, formattedData);
      } else {
        // If you're creating a new product
        await apiCall('post', '/products', formattedData);
      }
      router.refresh();
      // router.push('/dashboard/products');
    } catch (error: any) {
      console.error('Failed to submit the form:', error);
      // Handle the error (e.g., show a toast or message)
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await apiCall('delete', `/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
      console.error('Failed to delete the product:', error);
      // Handle the error (e.g., show a toast or message)
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { value: newCategory, label: newCategory }]);
      setNewCategory('');
    }
  };

  const deleteCategory = (categoryToDelete: string) => {
    setCategories(categories.filter(category => category.value !== categoryToDelete));
  };

  return (
    <>
      <Dialog open={typeModalOpen} onOpenChange={setTypeModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
            <DialogDescription>Add or remove product categories.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-between">
              <Input
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button className="ms-3" onClick={addCategory}>
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.value} className="flex justify-between items-center">
                  <span>{category.label}</span>
                  <Button
                    variant="destructive"
                    onClick={() => deleteCategory(category.value)}
                  >
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className="relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Category</FormLabel>
                    <Edit
                      className="text-red-500 ms-1"
                      height={15}
                      width={15}
                      onClick={() => setTypeModalOpen(true)}
                    />
                  </div>
                  <FormControl>
                    <ReactSelect
                      options={categories}
                      getOptionLabel={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      isDisabled={loading}
                      onChange={(selected) =>
                        field.onChange(selected ? selected.value : '')
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter SKU"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="costPerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost per Unit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Enter Cost per Unit"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === '' ? undefined : Number(e.target.value)
                        )
                      }
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
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
