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
import ReactSelect from 'react-select';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { Textarea } from '@/components/ui/textarea';
import { StaticImageData } from 'next/image';

export interface BagItem {
  itemName: string;
  itemPrice: number;
  unitQuantity: number;
  maximumQuantity: number;
  minimumQuantity: number;
  totalItemPrice?: number;
}

export interface Bag {
  bagName: string;
  bagItems: BagItem[];
  totalPrice: number;
  createdDate: string;
  updatedDate?: string;
  status: 'Active' | 'Inactive';
  visibility?: string;
  bagImage?: StaticImageData;
  description: string;
  totalWeight:number
}

const dummyItems = [
  { value: 'Carrot', label: 'Carrot', price: 20, unit: "grams", unitQuantity: 200, maximumQuantity: 4, minimumQuantity: 8 },
  { value: 'Broccoli', label: 'Broccoli', price: 17, unit: "pieces", unitQuantity: 500, maximumQuantity: 3, minimumQuantity: 2 },
  { value: 'Potato', label: 'Potato', price: 34, unit: "grams", unitQuantity: 600, maximumQuantity: 9, minimumQuantity: 8 },
];

const bagFormSchema = z.object({
  bagName: z.string().min(1, 'Bag name is required'),
  visibility: z.string().min(1, 'Visibility is required'),
  bagImage: z.object({}).optional(),
  description: z.string().min(1, 'Description is required'),
  bagItems: z.array(
    z.object({
      itemName: z.string().min(1, 'Item name is required'),
      itemPrice: z.number().nonnegative(),
      unitQuantity: z.number().nonnegative(),
      maximumQuantity: z.number().nonnegative(),
      minimumQuantity: z.number().nonnegative(),
      totalItemPrice: z.number().optional(),
    })
  ).min(1, 'At least one item is required'),
  totalPrice: z.number().nonnegative(),
  updatedDate: z.string().optional(),
  status: z.enum(['Active', 'Inactive']),
  totalWeight: z.number().nonnegative().min(1, 'Total weight is required'), // Added field
});

export const BagForm: React.FC<{ initialData?: Bag }> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bagItems, setBagItems] = useState<BagItem[]>(initialData?.bagItems || []);
  const form = useForm<Bag>({
    resolver: zodResolver(bagFormSchema),
    defaultValues: initialData || {
      bagName: '',
      visibility: "Admin",
      description: '',
      bagItems: [],
      totalPrice: 0,
      createdDate: '',
      status: 'Active',
    },
  });

  const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = form;
  const router = useRouter();

  const onSubmit: SubmitHandler<Bag> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        // Update existing bag
      } else {
        // Create new bag
      }
      // Refresh or redirect after submission
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const processForm: SubmitHandler<Bag> = (data) => {
    // Process form data
  };

  const steps = [
    {
      id: 'Step 1',
      name: 'Bag Details',
      fields: [ 'description']
    },
    {
      id: 'Step 2',
      name: 'Bag Items',
      fields: ['bagItems']
    }];

  const visibilityOption = [
    { id: '1', name: 'Admin' },
    { id: '2', name: 'Customer' }
  ];




  type FieldName = keyof Bag;

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };







  const handleAddItem = () => {
    setBagItems([...bagItems, { itemName: '', itemPrice: 0, unitQuantity: 0, maximumQuantity: 0, minimumQuantity: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedBagItems = bagItems.filter((_, i) => i !== index);
    setBagItems(updatedBagItems);
  };

  const handleItemChanges = (index: number, changes: Partial<BagItem>) => {
    const updatedBagItems = [...bagItems];
    updatedBagItems[index] = { ...updatedBagItems[index], ...changes };
    setBagItems(updatedBagItems);
  };

  // Calculate totals
  const totalItems = bagItems.length;
  const totalPrice = bagItems.reduce((acc, item) => acc + item.itemPrice, 0);

  return (
    <div className="container mx-auto p-4">
      <Heading title={initialData ? 'Edit Bag' : 'Create Bag'} description="Fill in the details below" />
      <Separator />
      <div className='mt-2'>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-[#04894D] py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-[#04894D] transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium my-2">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-[#04894D] py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-[#04894D]">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium my-2">{step.name}</span>
                </div>
              ) : (
                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div
            className={cn(
              currentStep === 1
                ? 'w-full mt-5'
                : 'gap-8 md:grid md:grid-cols-2 mt-5'
            )}
          >
            {currentStep === 0 && (
              <>
               
  

             

               

<FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bag Description</FormLabel>
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
              </>
            )}
            {currentStep === 1 && (
              <>
                <div className="mt-4">
                  <Button
                    type="button"
                    onClick={handleAddItem}
                    disabled={loading}
                    className="mt-2"
                  >
                    Add Item
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="mt-8">
            {bagItems.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Price
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Quantity (GM)
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Minimum Quantity
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Maximum Quantity
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bagItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <FormField
                          control={control}
                          name={`bagItems.${index}.itemName` as const}
                          render={({ field }) => (
                            <FormControl>
                              <Controller
                                control={control}
                                name={`bagItems.${index}.itemName` as const}
                                render={({ field }) => (
                                  <ReactSelect
                                    isClearable
                                    isSearchable
                                    options={dummyItems.map(item => ({
                                      value: item.value,
                                      label: item.label,
                                      price: item.price,
                                      unit: item.unit,
                                      unitQuantity: item.unitQuantity,
                                      maximumQuantity: item.maximumQuantity,
                                      minimumQuantity: item.minimumQuantity
                                    }))}
                                    formatOptionLabel={({ value, label, price }) => (
                                      <div className="flex justify-between">
                                        <span>{label}</span>
                                        {/* <span>₹{price}</span> */}
                                      </div>
                                    )}
                                    isDisabled={loading}
                                    onChange={(selected) => {
                                      field.onChange(selected?.value);
                                      const selectedItem = dummyItems.find(item => item.value === selected?.value);
                                      if (selectedItem) {
                                        handleItemChanges(index, {
                                          itemPrice: selectedItem.price,
                                          unitQuantity: selectedItem.unitQuantity,
                                          maximumQuantity: selectedItem.maximumQuantity,
                                          minimumQuantity: selectedItem.minimumQuantity
                                        });
                                      }
                                    }}
                                    value={dummyItems.find((option) => option.value === field.value)}
                                  />
                                )}
                              />
                            </FormControl>
                          )}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{item.itemPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.unitQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.minimumQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.maximumQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="mt-8 pt-5">
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={prev}
                disabled={currentStep === 0}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Button>
              {currentStep !== 1 && (
                <Button
                  type="button"
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Button>
              )}
            </div>
          </div>
          {currentStep === 1 && (
            <div className="mt-4">
              <Button
                type="submit"
                className="w-full disabled:cursor-not-allowed"
              >
                Submit
              </Button>
            </div>
          )}
        </form>
      </Form>
      {initialData && (
        <div className="mt-8 pt-5 border-t border-gray-200">
          <div className="flex justify-between">
            <Heading
              title="Delete Bag"
              description="This action cannot be undone."
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => {} /* Add your delete logic here */}
              disabled={loading}
            >
              Delete Bag
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
