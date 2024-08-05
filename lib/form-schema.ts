import * as z from 'zod';

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  lastname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  email: z
    .string()
    .email({ message: 'Product Name must be at least 3 characters' }),
  contactno: z.coerce.number(),
  country: z.string().min(1, { message: 'Please select a category' }),
  city: z.string().min(1, { message: 'Please select a category' }),
  address1: z.string().min(1, { message: 'Please Enter Address 1' }),
  frequency: z.string().min(1, { message: 'Please Enter Frequency' }),
  // state: z.string().min(1, { message: 'Please Enter Sate' }),
  address2: z.string().min(1, { message: 'Please Enter Address 2' }),
  assignedEmployee: z.string().min(1, { message: 'Please select an employee' }),
  subscriptionType: z.string().min(1, { message: 'Please select an Subscription Type' }),
  paymentType:  z.string().min(1, { message: 'Please select an Payment Type' }),
  subscriptionStartDate:  z.string().min(1, { message: 'Please Select Subscription Start Date' }),
  // jobs array is for the dynamic fields
  jobs: z.array(
    z.object({
      jobcountry: z.string().min(1, { message: 'Please select a category' }),
      jobcity: z.string().min(1, { message: 'Please select a category' }),
      jobtitle: z
        .string()
        .min(3, { message: 'Product Name must be at least 3 characters' }),
      employer: z
        .string()
        .min(3, { message: 'Product Name must be at least 3 characters' }),
        subscriptionStartDate: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: 'Start date should be in the format YYYY-MM-DD'
        }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'End date should be in the format YYYY-MM-DD'
      })
    })
  )
});

export type ProfileFormValues = z.infer<typeof profileSchema>;


//subscription schema 
export const subscriptionSchema = z.object({
  subscriptionId: z.number(),
  userId: z.number(),
  subscriptionPlan: z.string().min(3, { message: 'Subscription Plan must be at least 3 characters' }),
  subscriptionType: z.string().min(3, { message: 'Subscription Type must be at least 3 characters' }),
  numberOfDeliveries: z.number(),
  deliveryDays: z.array(z.string()).min(1,{message:"Delivery Days is Required"}),
  customizationOptions: z.array(z.string().min(1)).optional(),
  addons: z.array(z.string().min(1)).optional(),
  subscriptionStartDate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: 'Subscription start date should be in the format YYYY-MM-DD'
  }),
  subscriptionEndDate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: 'Subscription end date should be in the format YYYY-MM-DD'
  }),
  paymentStatus: z.string(),
  subscriptionStatus: z.enum(['Active', 'Inactive'])
});

// Define the TypeScript type from the schema
export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;