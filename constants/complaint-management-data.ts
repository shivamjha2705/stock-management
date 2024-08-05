// Define the ComplaintManagement interface
export interface ComplaintManagement {
  sno: number;
  complaintType: 'Delay' | 'Bad quality' | 'Wrong item' | 'Not reached';
  status: 'Active' | 'Inactive';
  resolution?: 'Coupon' | 'Store credits' | 'Add-on bag';
}

// Sample data for the complaint management system
export const ComplaintManagementData: ComplaintManagement[] = [
  {
    sno: 1,
    complaintType: 'Delay',
    status: 'Active',
    resolution: 'Coupon'
  },
  {
    sno: 2,
    complaintType: 'Bad quality',
    status: 'Inactive',
    resolution: 'Store credits'
  },
  {
    sno: 3,
    complaintType: 'Wrong item',
    status: 'Active',
    resolution: 'Add-on bag'
  },
  {
    sno: 4,
    complaintType: 'Not reached',
    status: 'Inactive',
    resolution: 'Add-on bag'
  }
];
