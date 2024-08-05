'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DeliveryManagement } from '@/constants/delivery-management-data';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: DeliveryManagement;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
  };

  const updateDeliveryStatus = () => {
    router.push(`/subscription-management/edit/${data.orderId}`); 
  };

  const handleViewAndManageOrder = () => {
    router.push(`/subscription-management/view/${data.orderId}`); 
  };

  const viewOrderDetals = () => {
    router.push(`/order/${data.orderId}`); 
  };

  const hanldeResheduleAndSkips = () => {
    router.push(`/subscription-management/toggleDeliveryDays/${data.orderId}`); 
  };

  const generatePackingList = () => {
    router.push(`/subscription-management/manageCustomizationOption/${data.orderId}`); 
  };

  const assignDeliveryRoutes = () => {
    router.push(`/order/assignOrder`); 
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
          <DropdownMenuItem onClick={updateDeliveryStatus}>
            <Edit className="mr-2 h-4 w-4" /> Update Delivery Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={viewOrderDetals}>
            <Eye className="mr-2 h-4 w-4" /> View Order Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={hanldeResheduleAndSkips}>
            <UserCheck className="mr-2 h-4 w-4" /> Reschedule and Skips
          </DropdownMenuItem>
          <DropdownMenuItem onClick={assignDeliveryRoutes}>
            <UserCheck className="mr-2 h-4 w-4" /> Assign Employee
          </DropdownMenuItem>
          <DropdownMenuItem onClick={assignDeliveryRoutes}>
            <UserCheck className="mr-2 h-4 w-4" /> Modify This Delivery
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
