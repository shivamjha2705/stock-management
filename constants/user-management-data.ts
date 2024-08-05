import { format, parseISO } from 'date-fns';
import { NavItem } from '@/types';

export type UserManagement = {
  sno: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city?: string;
  sector?: string;
  society?:string;
  houseNumber?: string;
  dob?:string;
  gender?:string;
  address: {
    houseNumber: string;
    addressLine1: string;
    addressLine2?: string;
  };
  assignedRoutes?: string[]; // Array of assigned routes
  subscriptionType: string;
  deliveryFrequency: string;
  paymentType: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  accountStatus: 'Active' | 'Inactive';
  employeeName: string;
  lastUpdateDate: string;
  createdDate: string;
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  return format(parseISO(dateString), 'dd MMM yyyy');
};
export const userManagementData: UserManagement[] = [
  {
    sno: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    city: "Delhi",
    sector: "sector 68",
    society:"m3m Marina",
    houseNumber: "s4 1404",
    dob:"11/JUL/2024",
    gender:"Male",
    address: {
      houseNumber: '123',
      addressLine1: 'Main St',
      addressLine2: 'Apt 4B',
    },
    assignedRoutes: ['Route 1'],
    subscriptionType: 'Weekly',
    deliveryFrequency: 'Biweekly',
    paymentType: 'Credit Card',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Active',
    employeeName: 'Deepak Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
  },
  {
    sno: 2,
    firstName: 'Ridhi',
    lastName: 'Mishra',
    email: 'ridhi.mishra@example.com',
    phoneNumber: '11111111',
    city: "Delhi",
    sector: "sector 68",
    society:"m3m Marina",
    houseNumber: "s4 1404",
    dob:"11/JUL/2024",
    gender:"Male",
    address: {
      houseNumber: '123',
      addressLine1: 'Main St',
      addressLine2: 'Apt 4B',
    },
    assignedRoutes: ['Route 3'],
    subscriptionType: 'Quarterly',
    deliveryFrequency: 'Weekly',
    paymentType: 'Net Banking',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Inactive',
    employeeName: 'Amar Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
  },
  {
    sno: 3,
    firstName: 'Deepak',
    lastName: 'Singh',
    email: 'deepak.singh@example.com',
    phoneNumber: '123-456-7890',
    city: "Delhi",
    sector: "sector 68",
    society:"m3m Marina",
    houseNumber: "s4 1404",
    dob:"11/JUL/2024",
    gender:"Male",
    address: {
      houseNumber: '123',
      addressLine1: 'Main St',
      addressLine2: 'Apt 4B',
    },
    assignedRoutes: ['Route 4'],
    subscriptionType: 'Semi Annual',
    deliveryFrequency: 'Monthly',
    paymentType: 'UPI',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Active',
    employeeName: 'Aman Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
  },
  {
    sno: 4,
    firstName: 'Shivam',
    lastName: 'Kumar',
    email: 'shivam.kumar@example.com',
    phoneNumber: '123-456-7890',
    city: "Delhi",
    sector: "sector 68",
    society:"m3m Marina",
    houseNumber: "s4 1404",
    dob:"11/JUL/2024",
    gender:"Male",
    address: {
      houseNumber: '123',
      addressLine1: 'Main St',
      addressLine2: 'Apt 4B',
    },
    assignedRoutes: ['Route 6'],
    subscriptionType: 'Annual',
    deliveryFrequency: 'Fortnightly',
    paymentType: 'Net Banking',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Inactive',
    employeeName: 'Roshan Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
  },
  {
    sno: 5,
    firstName: 'Vikash',
    lastName: 'Singh',
    email: 'vikash.singh@example.com',
    phoneNumber: '123-456-7890',
    city: "Delhi",
    sector: "sector 68",
    society:"m3m Marina",
    houseNumber: "s4 1404",
    dob:"11/JUL/2024",
    gender:"Male",
    address: {
      houseNumber: '123',
      addressLine1: 'Main St',
      addressLine2: 'Apt 4B',
    },
    assignedRoutes: ['Route 6'],
    subscriptionType: 'Trial',
    deliveryFrequency: 'Biweekly',
    paymentType: 'Credit Card',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Active',
    employeeName: 'Vikash Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
  },
  {
    sno: 6,
    firstName: 'Prashant',
    lastName: 'Singh',
    email: 'prashant.singh@example.com',
    phoneNumber: '123-456-7890',
    city: "Delhi",
    sector: "sector 68",
    society:"m3m Marina",
    houseNumber: "s4 1404",
    dob:"11/JUL/2024",
    gender:"Male",
    address: {
      houseNumber: '123',
      addressLine1: 'Main St',
      addressLine2: 'Apt 4B',
    },
    assignedRoutes: ['Route 6'],
    subscriptionType: 'Quarterly',
    deliveryFrequency: 'Daily',
    paymentType: 'UPI',
    subscriptionStartDate: formatDate('2023-01-01'),
    subscriptionEndDate: formatDate('2023-12-31'),
    accountStatus: 'Inactive',
    employeeName: 'Prashant Singh',
    lastUpdateDate: formatDate('2023-07-01'),
    createdDate: formatDate('2023-01-01'),
  },
];

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    title: 'User',
    href: '/user',
    icon: 'user',
    label: 'User',
  },
  {
    title: 'User Management',
    href: '/user-management',
    icon: 'management',
    label: 'User Management',
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: 'profile',
    label: 'Profile',
  },
];
