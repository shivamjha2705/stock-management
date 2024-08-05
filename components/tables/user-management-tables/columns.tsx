'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { UserManagement, userManagementData } from '@/constants/user-management-data';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, X, Mail, Phone, MapPin } from 'lucide-react';
import upi from '@/public/assets/icons/upi.png';
import credit from '@/public/assets/icons/credit.png';
import net from '@/public/assets/icons/net.png';
import Image from 'next/image';
import AssignedRoutesCell from '@/components/AssignedRoutesCell';
import { DataTable } from '@/components/ui/data-table';

// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const columns: ColumnDef<UserManagement>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'sno',
    header: 'SNo',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className="text-red-600 font-bold px-1" style={{ borderRadius: '50%' }}>
          {row.original.sno}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        >
          {row.original.firstName.charAt(0)}
        </div>
        <span>{row.original.firstName}</span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col me-5">
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={10} height={10} />
          <span className="text-[12px]">{row.original.email}</span>
        </div>
        <div className="flex items-center mt-2">
          <Phone className="text-green-500 mr-2" width={10} height={10} />
          <span className="text-[12px]">{row.original.phoneNumber}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'dob',
    header: 'DATE OF BIRTH',
  },
  
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'houseNumber',
    header: 'House Number',
  },
  {
    accessorKey: 'society',
    header: 'Society',
    cell: ({ row }) => (
      <div className="flex items-center mt-1 me-4">
        <MapPin className="text-red-500 mr-2" width={16} height={16} />
        {row.original.society}
      </div>
    ),
  },
  {
    accessorKey: 'sector',
    header: 'Sector',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },

  
 



  // {
  //   accessorKey: 'assignedRoutes',
  //   header: 'Assigned Routes',
  //   cell: ({ row }) => (
  //     <AssignedRoutesCell
  //       routes={row.original.assignedRoutes || []}
  //       onSave={(newRoutes) => {
  //         row.original.assignedRoutes = newRoutes;
  //       }}
  //     />
  //   ),
  // },
  {
    accessorKey: 'subscriptionType',
    header: 'Subscription Type',
  },

  // {
  //   accessorKey: 'address',
  //   header: 'Address',
  //   cell: ({ row }) => (
  //     <div className="flex items-center mt-1 me-4">
  //       <MapPin className="text-red-500 mr-2" width={16} height={16} />
  //       {row.original.address.houseNumber}, {row.original.address.addressLine1},{' '}
  //       {row.original.address.addressLine2}
  //     </div>
  //   ),
  // },
  {
    accessorKey: 'paymentType',
    header: 'Payment Type',
    cell: ({ row }) => (
      <div className="flex items-center me-9">
        {row.original.paymentType === 'UPI' && <Image src={upi.src} alt="UPI" width={20} height={20} />}
        {row.original.paymentType === 'Credit Card' && <Image src={credit.src} alt="Credit Card" width={20} height={20} />}
        {row.original.paymentType === 'Net Banking' && <Image src={net.src} alt="Net Banking" width={20} height={20} />}
        <span className="ml-2">{row.original.paymentType}</span>
      </div>
    ),
  },
  {
    accessorKey: 'accountStatus',
    header: 'Account Status',
    cell: ({ row }) => (
      <div
        style={{ borderRadius: '20px' }}
        className={`flex items-center px-2 py-1 ${
          row.original.accountStatus === 'Active' ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        {row.original.accountStatus === 'Active' ? (
          <Check width={16} height={16} className="text-green-500 mr-2" />
        ) : (
          <X width={16} height={16} className="text-red-900 mr-2" />
        )}
        <span className="text-black bold">{row.original.accountStatus}</span>
      </div>
    ),
  },
  {
    accessorKey: 'subscriptionStartDate',
    header: 'Subscription Start Date',
  },
  {
    accessorKey: 'subscriptionEndDate',
    header: 'Subscription End Date',
  },
  {
    accessorKey: 'employeeName',
    header: 'Associated Employee ',
    cell: ({ row }) => (
      <div className="text-center">{row.original.employeeName}</div>
    ),
  },
  {
    accessorKey: 'deliveryFrequency',
    header: 'Delivery Frequency',
  },
  {
    accessorKey: 'lastUpdateDate',
    header: 'Last Profile Update',
  },
  {
    accessorKey: 'createdDate',
    header: 'Created Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
