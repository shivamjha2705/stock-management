'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { DeliveryManagement, DeliveryManagementData } from '@/constants/delivery-management-data';
import { CalendarDateRangePicker } from '@/components/date-range-picker';

export const DeliveryClient: React.FC = () => {
  const router = useRouter();
  const initialData: DeliveryManagement[] = DeliveryManagementData;
  const [data, setData] = useState<DeliveryManagement[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.customerName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const filters = [
    {
      label: 'Payment Status',
      subOptions: ['Paid', 'Unpaid'],
    },
    {
      label: 'Delivery Status',
      subOptions: ['Pending', 'Delivered', 'Cancelled'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Delivery (${data.length})`}
          description="Manage Delivery (Client side table functionalities.)"
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/order`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
      </div>
      <Separator />
      
      <div className="flex justify-end">
        <CalendarDateRangePicker />
      </div>
      <DataTable
        searchKey="customerName"
        columns={columns}
        data={data}
        filters={filters}
        onSearch={handleSearch}
      />
    </>
  );
};
