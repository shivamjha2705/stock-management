'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { Bag, BagData } from '@/constants/bag-data';

export const BagClient: React.FC = () => {
  const router = useRouter();
  const initialData: Bag[] = BagData;
  const [data, setData] = useState<Bag[]>(initialData);

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
      item.bagName.toLowerCase().includes(searchValue.toLowerCase())
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
      label: 'Status',
      subOptions: ['Available', 'Out of Stock'],
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Bags (${data.length})`}
          description="Manage Bags (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/bag-management`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="bagName"
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
