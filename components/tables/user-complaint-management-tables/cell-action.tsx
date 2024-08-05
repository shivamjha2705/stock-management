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
import { ComplaintManagement } from '@/constants/complaint-management-data';
import { ComplaintManagementUser } from '@/constants/complaint-management-data-user';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: ComplaintManagementUser;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
  };

  const handleRegisterNewSubscription = () => {
    router.push('/complaint-management/register'); 
  };

  const editComplaintMessage = () => {
    router.push(`/complaint-management/editComplaintMessage/${data}`); 
  };

  const viewComplaint = () => {
    router.push(`/complaint-management/viewComplaint/${data}`); 
  };

  const updateComplaintStatus = () => {
    router.push(`/complaint-management/updateComplaintStatus/${data}`); 
  };
  const recordResolution = () => {
    router.push(`/complaint-management/recordResolution/${data}`); 
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

          {/* <DropdownMenuItem onClick={handleRegisterNewSubscription}>
            <UserPlus className="mr-2 h-4 w-4" /> Create New Subscription
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={editComplaintMessage}>
            <Edit className="mr-2 h-4 w-4" /> Edit Complaint Message
          </DropdownMenuItem>
          <DropdownMenuItem onClick={viewComplaint}>
            <Eye className="mr-2 h-4 w-4" /> View Complaint 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={updateComplaintStatus}>
            <UserCheck className="mr-2 h-4 w-4" /> Update Complaint Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={recordResolution}>
            <UserCheck className="mr-2 h-4 w-4" /> Record Resolution
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
