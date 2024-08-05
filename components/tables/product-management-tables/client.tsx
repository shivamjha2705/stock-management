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
import { SubscriptionManagement, SubscriptionManagementData } from '@/constants/subscription-management-data';
import { ProductManagement, ProductManagementData } from '@/constants/product-management-data';

export const ProductManagementClient: React.FC = () => {
  const router = useRouter();
  const initialData: ProductManagement[] = ProductManagementData;
  const [data, setData] = useState<ProductManagement[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.itemName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    // Example: Sorting by first name
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.itemName.localeCompare(b.itemName);
      } else {
        return b.itemName.localeCompare(a.itemName);
      }
    });
    setData(sortedData);
  };
  const filters = [
    {
      label: 'Season ',
      subOptions: ['Winter', 'Autumn',],
    },
    {
      label: 'Priority',
      subOptions: ['High', 'Medium', 'Low'],
    },
  
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Items (${data.length})`}
          description="Manage Items (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/product`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="itemName"
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        filters={filters}

        // onSort={handleSort} 
      />
    </>
  );
};
