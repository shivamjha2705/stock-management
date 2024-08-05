import subscriptionImage1 from '@/public/assets/strawberry_13643533.png';
import subscriptionImage2 from '@/public/assets/vegetables_862860.png';
import { StaticImageData } from 'next/image';

export interface Subscription {
  subscriptionType: string;
  customerName: string;
  frequency: string;
  price: number;
  offers: string; 
  totalDelivery?:number;
  deliveryDays: string[];
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  subscriptionStatus: 'Active' | 'Inactive'; // Subscription status
  paymentStatus?: string; // Example: paid, unpaid, etc.
  bagName?: string;
  netPrice?: number;
  visibility?: string;
  image?: StaticImageData;
  description?: string;
}

export const SubscriptionData: Subscription[] = [
  {
    subscriptionType: 'Annual',
    customerName: 'John Doe',
    frequency: 'Biweekly',
    price: 16455,
    offers: '25% Off',
    deliveryDays: ['Monday', 'Thursday'],
    subscriptionStartDate: '2023-01-01',
    subscriptionEndDate: '2023-12-31',
    subscriptionStatus: 'Active',
    paymentStatus: 'Paid',
    bagName: "Regular Veggie Bag",
    netPrice: 15323,
    totalDelivery:24,
    visibility: 'Admin',
    image: subscriptionImage1,
    description: 'This is an annual subscription with biweekly deliveries and a 25% discount.'
  },
  {
    subscriptionType: 'Monthly',
    customerName: 'Jane Smith',
    frequency: 'Fortnightly',
    price: 15455,
    offers: '31% Off',
    deliveryDays: ['Wednesday', 'Saturday'],
    subscriptionStartDate: '2023-07-01',
    subscriptionEndDate: '2023-07-31',
    subscriptionStatus: 'Inactive',
    paymentStatus: 'Unpaid',
    bagName: "Mini Veggie Bag",
    netPrice: 15323,
    totalDelivery:4,
    visibility: 'Admin',
    image: subscriptionImage2,
    description: 'This is a monthly subscription with fortnightly deliveries and a 31% discount.'
  },
  {
    subscriptionType: 'Quarterly',
    customerName: 'Alice Johnson',
    frequency: 'Biweekly',
    price: 13245,
    offers: '44% Off',
    deliveryDays: ['Tuesday', 'Friday'],
    subscriptionStartDate: '2023-04-01',
    subscriptionEndDate: '2023-06-30',
    subscriptionStatus: 'Active',
    paymentStatus: 'Paid',
    bagName: "Regular Veggie Bag",
    netPrice: 15323,
    visibility: 'Admin',
    totalDelivery:24,
    image: subscriptionImage1,
    description: 'This is a quarterly subscription with biweekly deliveries and a 44% discount.'
  }
];
