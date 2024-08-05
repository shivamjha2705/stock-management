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
import { EmployeeManagement } from '@/constants/employee-management-data';
import { Edit, MoreHorizontal, Trash, Eye, UserPlus, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: EmployeeManagement;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // Your confirm logic here
  };

 
  const editEmployeeDetails = () => {
    router.push(`/employee-management/editEmployeeDetails/${data}`); 
  };

  const viewEmployeePerformance = () => {
    router.push(`/employee-management/viewEmployeePerformance/${data}`); 
  };

  const assignUserToEmployee = () => {
    router.push(`/employee-management/assignUserToEmployee/${data}`); 
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
      
          <DropdownMenuItem onClick={viewEmployeePerformance}>
            <Eye className="mr-2 h-4 w-4" /> View Employee Performance 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={editEmployeeDetails}>
            <UserCheck className="mr-2 h-4 w-4" /> Edit Employee Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={assignUserToEmployee}>
            <UserCheck className="mr-2 h-4 w-4" /> Assign Customer To Employee
          </DropdownMenuItem>
          <DropdownMenuItem onClick={assignUserToEmployee}>
            <UserCheck className="mr-2 h-4 w-4" /> Edit Permissions
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete Employee
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
