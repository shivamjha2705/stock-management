'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CellAction } from './cell-action';

// Function to generate a random color in hex format
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const columns: ColumnDef<any>[] = [ // Adjust type if you have a specific Employee type
  {
    id: 'sno', // Unique id for the serial number column
    header: 'S.No',
    cell: ({ row }) => (
      <span>{row.index + 1}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'first_name', // Updated to match API response
    header: 'First Name',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div 
          className="flex items-center justify-center w-8 h-8 rounded-full mr-2"
          style={{ backgroundColor: getRandomColor(), color: 'white' }}
        >
          {row?.original?.first_name?.charAt(0)}
        </div>
        <span>{row?.original?.first_name}</span>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'last_name', // Updated to match API response
    header: 'Last Name',
    cell: ({ row }) => (
      <span>{row?.original?.last_name}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'phone_no', // Updated to match API response
    header: 'Phone',
    cell: ({ row }) => (
      <div className="flex items-center mt-1">
        <Phone className="text-green-500 mr-2" width={10} height={10} />
        <span>{row?.original?.phone_no}</span>
      </div>
    )
  },
  {
    accessorKey: 'email', // Updated to match API response
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex items-center mt-1">
        <Mail className="text-blue-500 mr-2" width={10} height={10} />
        <span>{row?.original?.email}</span>
      </div>
    )
  },
  {
    accessorKey: 'address', // Updated to match API response
    header: 'Address',
    cell: ({ row }) => (
      <span>{row?.original?.address}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'city', // Updated to match API response
    header: 'City',
    cell: ({ row }) => (
      <span>{row?.original?.city}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'state', // Assuming this is a direct property
    header: 'State',
    cell: ({ row }) => (
      <span>{row?.original?.state}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'City', // Updated to match API response
    header: 'City',
    cell: ({ row }) => (
      <span>{row?.original?.City}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'zip_code', // Updated to match API response
    header: 'Zip Code',
    cell: ({ row }) => (
      <span>{row?.original?.zip_code}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'gstin', // Updated to match API response
    header: 'GSTIN',
    cell: ({ row }) => (
      <span>{row?.original?.gstin}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'client_type', // Updated to match API response
    header: 'Client Type',
    cell: ({ row }) => (
      <span>{row?.original?.client_type}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    accessorKey: 'category', // Updated to match API response
    header: 'Category',
    cell: ({ row }) => (
      <span>{row?.original?.category}</span> // Display the index of the row + 1 for serial number
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];