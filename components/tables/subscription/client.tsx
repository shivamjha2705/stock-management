'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Subscription, SubscriptionData } from '@/constants/subscription-data';

export const SubscriptionClient: React.FC = () => {
  const router = useRouter();
  const initialData: Subscription[] = SubscriptionData;
  const [data, setData] = useState<Subscription[]>(initialData);

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const updateColumnData = (columnId: string, value: any) => {
    setData((old) =>
      old.map((row) => ({
        ...row,
        [columnId]: value,
      }))
    );
  };

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.subscriptionType.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSave = () => {
    // Save the data to the server or localStorage or any persistence storage
    console.log('Data saved:', data);
    // Implement the logic to save the data
  };
  const filters = [
    {
      label: 'Subscription Type',
      subOptions: ['Trial', 'Weekly', 'Monthly', 'Fortnightly', 'Bi Weekly'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Subscription (${data.length})`}
          description="Manage Subscription (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/subscription-form`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="subscriptionType"
        columns={columns}
        data={data}
        onSearch={handleSearch}
        meta={{ updateData, updateColumnData }}
        filters={filters}

      />
      <Button onClick={handleSave}>Save Changes</Button>
    </>
  );
};
