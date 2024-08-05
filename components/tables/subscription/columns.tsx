'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Subscription } from '@/constants/subscription-data';
import { Checkbox } from '@/components/ui/checkbox';
import { SubscriptionCellAction } from './cell-action';
import { Calendar, Check, X, IndianRupee } from 'lucide-react';
import Image from 'next/image';

export const columns: ColumnDef<Subscription>[] = [
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
    enableHiding: false
  },
  {
    accessorKey: 'sno',
    header: 'Sno',
    cell: ({ row }) => (
      <div className="flex items-center mt-1">
        <span>{row.index + 1}</span>
      </div>
    ),
  },
  {
    accessorKey: 'subscriptionType',
    header: 'Subscription Type',
  },
  {
    accessorKey: 'frequency',
    header: 'Frequency',
    cell: ({ row }) => (
      <div>
        {row.original.frequency}
      </div>
    )
  },
  {
    accessorKey: 'totalDelivery',
    header: 'Total Delivery',
    cell: ({ row }) => (
      <div>
        {row.original.totalDelivery}
      </div>
    )
  },
  {
    accessorKey: 'bagName',
    header: 'Bags Name',
  },
  {
    accessorKey: 'visibility',
    header: 'Visibility',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 ${
          row.original.visibility === 'Admin' ? 'bg-red-400' :
          row.original.visibility === 'Customer' ? 'bg-green-400' :
          'bg-red-400'
        }`}
      >
        <span className='text-black bold'>{row.original.visibility === 'Admin' ? "Admin" : "Public"}</span>
      </div>
    )
  },
  {
    accessorKey: 'subscriptionStatus',
    header: 'Subscription Status',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 me-5 ${
          row.original.subscriptionStatus === 'Active' ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        {row.original.subscriptionStatus === 'Active' ? (
          <Check width={16} height={16} className="text-green-500 mr-2" />
        ) : (
          <X width={16} height={16} className="text-red-900 mr-2" />
        )}
        <span className="text-black bold">{row.original.subscriptionStatus}</span>
      </div>
    )
  },
  {
    accessorKey: 'deliveryDays',
    header: 'Delivery Days',
    cell: ({ row }) => (
      <ul>
        {row.original.deliveryDays?.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    )
  },

 
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className="flex items-center">
        <IndianRupee className="mr-1" width={16} height={16} />
        {row.original.price}
      </div>
    )
  },
  {
    accessorKey: 'offers',
    header: 'Offers',
  },
  {
    accessorKey: 'netPrice',
    header: 'Net Price',
    cell: ({ row }) => (
      <div className="flex items-center">
        <IndianRupee className="mr-1" width={16} height={16} />
        {row.original.netPrice}
      </div>
    )
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.image && <Image src={row.original.image} alt={row.original.subscriptionType} width={50} height={50} />}
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="text-start">
        {row.original.description?.split(' ').slice(0, 10).join(' ')}...
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <SubscriptionCellAction data={row.original} />,
  },
];
