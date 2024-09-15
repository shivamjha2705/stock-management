// CellAction.tsx
'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToastAtTopRight } from '@/lib/sweetAlert';
import { MoreHorizontal, Trash, Eye, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store'; // Adjust to your store path
import { deleteCustomer } from '@/app/redux/slices/customerSlice';

interface CellActionProps {
  data: {
    customer_id: string; // Ensure your data has the necessary properties
  };
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    try {
      setLoading(true);
      await dispatch(deleteCustomer(data.customer_id)); // Correctly typed dispatch
      ToastAtTopRight.fire({
        icon: 'success',
        title: 'Customer deleted successfully',
      });
      setOpen(false); // Close the modal after deletion
    } catch (error: any) {
      ToastAtTopRight.fire({
        icon: 'error',
        title: error?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const editEmployeeDetails = () => {
    router.push(`/customer/edit/${data.customer_id}`);
  };

  const viewEmployee = () => {
    router.push(`/customer/view/${data.customer_id}`);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={viewEmployee}>
            <Eye className="mr-2 h-4 w-4" /> View Employee
          </DropdownMenuItem>

          <DropdownMenuItem onClick={editEmployeeDetails}>
            <UserCheck className="mr-2 h-4 w-4" /> Edit Employee
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete Employee
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
