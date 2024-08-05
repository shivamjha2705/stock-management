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

export const OrderManagementClient: React.FC = () => {
  const router = useRouter();
  const initialData: OrderManagement[] = OrderManagementData;
  const [data, setData] = useState<OrderManagement[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.customerName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const filters = [
    {
      label: 'Payment Status',
      subOptions: ['Paid', 'Unpaid',],
    },
    {
      label: 'Delivery Status',
      subOptions: ['Pending', 'Delivered', 'Canceled'],
    },
  
  ];


  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Order (${data.length})`}
          description="Manage Orders (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/order`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="customerName"
        columns={columns}
        data={data}
        filters={filters}

        onSearch={handleSearch} 
        // onSort={handleSort} 
      />
    </>
  );
};
