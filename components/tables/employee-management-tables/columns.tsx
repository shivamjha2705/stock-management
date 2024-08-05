// columns/EmployeeManagementColumns.tsx
'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { EmployeeManagement } from '@/constants/employee-management-data';
import { Mail, Phone } from 'lucide-react';
import AssignedRoutesCell from '@/components/AssignedRoutesCell';
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

export const columns: ColumnDef<EmployeeManagement>[] = [
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
    header: 'EID'
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
    accessorKey: 'contactInformation.phone',
    header: 'Phone',
    cell: ({ row }) => (
      <div className="flex items-center mt-1">
        <Phone className="text-green-500 mr-2" width={10} height={10} />
        <span className="">{row.original.contactInformation.phone}</span>
      </div>
    )
  },
  {
    accessorKey: 'contactInformation.email',
    header: 'Email',
    cell: ({ row }) => (
        <div className="flex items-center mt-1">
          <Mail className="text-blue-500 mr-2" width={10} height={10} />
          <span className="">{row.original.contactInformation.email}</span>
      </div>
    )
  },
  {
    accessorKey: 'dob',
    header: 'Dob'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },
  {
    accessorKey: 'address',
    header: 'Street Address'
  },
  {
    accessorKey: 'city',
    header: 'City'
  },
  {
    accessorKey: 'state',
    header: 'State'
  },

 
  {
    accessorKey: 'assignedUsers',
    header: 'Assigned Customers',
    cell: ({ row }) => (
      <ul>
        {row.original.assignedUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    )
  },

 
  {
    accessorKey: 'role',
    header: 'Role'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
