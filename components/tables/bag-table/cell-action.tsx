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
import { Bag } from '@/constants/bag-data';
import { Edit, MoreHorizontal, Trash, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BagCellActionProps {
  data: Bag;
}

export const BagCellAction: React.FC<BagCellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    // confirm logic here
    setLoading(true);
    try {
      // Perform delete operation
      setOpen(false);
    } catch (error) {
      console.error('Failed to delete the bag:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBag = () => {
    router.push(`/bags/edit/${data.bagName}`);
  };

  const handleViewBag = () => {
    router.push(`/bags/view/${data.bagName}`);
  };

  const handleDeleteBag = () => {
    setOpen(true);
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
          <DropdownMenuItem onClick={handleEditBag}>
            <Edit className="mr-2 h-4 w-4" /> Edit 
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewBag}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteBag}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
