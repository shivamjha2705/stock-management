'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { UserManagement, userManagementData } from '@/constants/user-management-data';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { OrderManagement, OrderManagementData } from '@/constants/order-management-data';
import { DataTableRecent } from '@/components/ui/data-tableRecent';

export const OrderRecentClient: React.FC = () => {
  const router = useRouter();
  const initialData: OrderManagement[] = OrderManagementData;
  const [data, setData] = useState<OrderManagement[]>(initialData);


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Recent Order's`}
          description=""
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/order`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      <DataTableRecent
        searchKey="deliveryStatus"
        columns={columns}
        data={data}

        
      />
    </>
  );
};
