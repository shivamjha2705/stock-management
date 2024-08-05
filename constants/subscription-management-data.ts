import { NavItem } from '@/types';

export interface SubscriptionManagement {
  subscriptionId: number;
  userId: number;
  subscriptionPlan: string;
  numberOfDeliveries: number;
  deliveryDays: string[];
  customizationOptions?: string[]; // Array of customization options
  addons?: string[]; // Array of add-ons
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  paymentStatus?: string; // Example: paid, unpaid, etc.
  subscriptionStatus: 'Active' | 'Inactive'; // Subscription status
}


export const SubscriptionManagementData: SubscriptionManagement[] = [
  {
    subscriptionId: 1,
    userId: 1,
    subscriptionPlan: 'Quarterly',
    numberOfDeliveries: 4,
    deliveryDays: ['Wed', 'Fri'], // Wednesday and Saturday
    subscriptionStartDate: '2023-01-01',
    subscriptionEndDate: '2023-12-31',
    subscriptionStatus: 'Active',
    customizationOptions: ['Extra tomatoes', 'No onions'],
    addons: ['Fruit basket']
  },
  {
    subscriptionId: 2,
    userId: 2,
    subscriptionPlan: 'SemiAnnual',
    numberOfDeliveries: 6,
    deliveryDays: ['Mon','Sat'], // Tuesday and Friday
    subscriptionStartDate: '2023-02-15',
    subscriptionEndDate: '2023-06-15',
    subscriptionStatus: 'Inactive',
    customizationOptions: ['Extra spinach'],
    addons: ['Flower bouquet']
  }
];


// export const navItems: NavItem[] = [
//   {
//     title: 'Dashboard',
//     href: '/dashboard',
//     icon: 'dashboard',
//     label: 'Dashboard'
//   },
//   {
//     title: 'User',
//     href: '/user',
//     icon: 'user',
//     label: 'User'
//   },
//   { 
//     title: 'User Management',
//     href: '/user-management',
//     icon: 'management', 
//     label: 'User Management'
//   },
//   {
//     title: 'Profile',
//     href: '/profile',
//     icon: 'profile',
//     label: 'Profile'
//   }
// ];
