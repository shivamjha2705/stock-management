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
import { Subscription } from '@/constants/subscription-data';
import { Edit, MoreHorizontal, Trash, Eye, CheckSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SubscriptionCellActionProps {
  data: Subscription;
}

export const SubscriptionCellAction: React.FC<SubscriptionCellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // confirm logic here
  };

  
  const handleEditSubscription = () => {
    router.push(`/subscriptions/edit/${data.subscriptionType}`);
  };
  const handleInactiveSubscription = () => {
    router.push(`/subscriptions/view/${data.subscriptionType}`);
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
          <DropdownMenuItem onClick={handleEditSubscription}>
            <Edit className="mr-2 h-4 w-4" /> Edit 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleInactiveSubscription}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
         
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
