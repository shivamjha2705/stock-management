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
import { ComplaintManagement, ComplaintManagementData } from '@/constants/complaint-management-data';

export const ComplaintManagementClient: React.FC = () => {
  const router = useRouter();
  const initialData: ComplaintManagement[] = ComplaintManagementData;
  const [data, setData] = useState<ComplaintManagement[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.complaintType.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    // Example: Sorting by first name
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.complaintType.localeCompare(b.complaintType);
      } else {
        return b.complaintType.localeCompare(a.complaintType);
      }
    });
    setData(sortedData);
  };



  const filters = [
    {
      label: 'Status ',
      subOptions: ['Open', 'Closed',],
    },
    {
      label: 'Complain Type',
      subOptions: ['Delay', 'Bad Quality', 'Wrong Item', 'Not Reached'],
    },
  
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={` Create Complaint Type (${data.length})`}
          description="Complaint Subscription (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/complaint`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="complaintType"
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        filters={filters}
        // onSort={handleSort} 
      />
    </>
  );
};
