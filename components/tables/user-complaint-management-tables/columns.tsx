'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { ComplaintManagementUser } from '@/constants/complaint-management-data-user';

export const columns: ColumnDef<ComplaintManagementUser>[] = [
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
    header: 'Sno'
  },
  {
    accessorKey: 'name',
    header: 'name'
  },
  {
    accessorKey: 'complaintType',
    header: 'Complaint Type'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 ${
          row.original.status === 'Open' ? 'bg-green-400' :
          row.original.status === 'Closed' ? 'bg-red-400' :
          'bg-red-400'
        }`}
      >
        <span className='text-black bold'>{row.original.status}</span>
      </div>
    )
  },
  {
    accessorKey: 'resolution',
    header: 'Resolution'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
