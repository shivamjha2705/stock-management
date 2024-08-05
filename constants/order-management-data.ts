export interface DeliveryInfo {
  deliveryDate: string; // ISO format date string
  deliveryTimeSlot: string; // Example: '9am - 11am'
  assignedEmployee?: string;
  assignedRoutes?: string;
  deliveryStatus: 'Pending' | 'Delivered' | 'Cancelled'; // Delivery status options
}

export interface OrderManagement {
  orderId: number;
  empId?: number;
  customerName: string;
  employeeName?: string;
  deliveries: DeliveryInfo[];
  bagOrdered?: string[]; // Array of product names or IDs
  subscriptionType?: string; // Array of product names or IDs
  totalWeight: number; // Total weight in kg
  addons?: string[]; // Array of add-ons
  paymentStatus: 'Paid' | 'Unpaid' | 'Pending'; // Example: paid, unpaid, pending
  specialInstructions?: string; // Special delivery instructions
  totalPrice?: number; // Total price
}

export const OrderManagementData: OrderManagement[] = [
  {
    orderId: 101,
    empId: 1022,
    customerName: "Deepak Singh",
    deliveries: [
     
      {
        deliveryDate: '2023-07-17',
        deliveryTimeSlot: '10am - 12pm',
        deliveryStatus: 'Delivered',
        assignedEmployee:"Deepak singh",
        assignedRoutes:"Route 1"
      },
      {
        deliveryDate: '2023-07-18',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee:"Deepak singh",
        assignedRoutes:"Route 1"
      },
      {
        deliveryDate: '2023-07-19',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee:"Deepak singh",

      },
      {
        deliveryDate: '2023-07-20',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee:"Deepak singh",
      },
    ],
    bagOrdered: ['Regular Veggie Bag'],
    subscriptionType: 'Regular Veggie Bag',
    totalWeight: 10000,
    totalPrice: 779,
    addons: ['Lemons'],
    paymentStatus: 'Paid',
    specialInstructions: 'Leave the package at the front door.'
  },
  {
    orderId: 102,
    empId: 10332,
    customerName: "Kartik Kumar",
    deliveries: [
      {
        deliveryDate: '2023-07-20',
        deliveryTimeSlot: '1pm - 3pm',
        deliveryStatus: 'Delivered',
        assignedEmployee:"Deepak singh",
        assignedRoutes:"Route 1"

      }
    ],
    bagOrdered: ['Mini Veggie Bag'],
    subscriptionType: 'Mini Veggie Bag',
    totalWeight: 80000,
    totalPrice: 733,
    addons: ['Lady Finger'],
    paymentStatus: 'Unpaid',
    specialInstructions: 'Call on arrival.'
  },
  {
    orderId: 103,
    empId: 1332,
    customerName: "Shivam Kumar",
    deliveries: [
      {
        deliveryDate: '2023-07-22',
        deliveryTimeSlot: '11am - 1pm',
        deliveryStatus: 'Cancelled',
        assignedEmployee:"Kartik singh",
        assignedRoutes:"Route 1"


      }
    ],
    bagOrdered: ['Brinjal'],
    subscriptionType: 'Mini Veggie Bag',
    totalWeight: 50000,
    totalPrice: 567,
    addons: [],
    paymentStatus: 'Unpaid',
    specialInstructions: 'Deliver to the back gate.'
  },
  {
    orderId: 104,
    empId: 1032,
    customerName: "Ridhi Mishra",
    deliveries: [
      {
        deliveryDate: '2023-07-25',
        deliveryTimeSlot: '2pm - 4pm',
        deliveryStatus: 'Pending',
        assignedEmployee:"Arya singh",
        assignedRoutes:"Route 1"

      },
      {
        deliveryDate: '2023-07-25',
        deliveryTimeSlot: '2pm - 4pm',
        deliveryStatus: 'Pending',
        assignedEmployee:"Shivam kumar",
        assignedRoutes:"Route 1"


      }
    ],
    bagOrdered: ['Regular Veggie Bag'],
    subscriptionType: 'Mini Veggie Bag',
    totalWeight: 50000,
    totalPrice: 986,
    addons: ['Tomato', 'Potato'],
    paymentStatus: 'Paid',
    specialInstructions: 'Ring the bell twice.'
  },
  {
    orderId: 105,
    empId: 1022,
    customerName: "Arya Singh",
    subscriptionType: 'Mini Veggie Bag',
    deliveries: [
      {
        deliveryDate: '2023-07-27',
        deliveryTimeSlot: '10am - 12pm',
        deliveryStatus: 'Delivered',
        assignedEmployee:"Rohit singh",
        assignedRoutes:"Route 1"


      }
    ],
    bagOrdered: ['Regular Veggie Bag'],
    totalWeight: 70000,
    totalPrice: 999,
    addons: ['Carrots'],
    paymentStatus: 'Paid',
    specialInstructions: 'Leave with the neighbor if not home.'
  }
];
