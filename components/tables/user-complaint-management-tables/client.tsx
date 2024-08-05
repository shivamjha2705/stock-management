'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { ComplaintManagementUser, ComplaintManagementUserData } from '@/constants/complaint-management-data-user';

const ComplaintManagementUserPage: React.FC = () => {
  const router = useRouter();
  const initialData: ComplaintManagementUser[] = ComplaintManagementUserData;
  const [data, setData] = useState<ComplaintManagementUser[]>(initialData);

  const handleSearch = (searchValue: string) => {
    const filteredData = initialData.filter(item =>
      item.description.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
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
      label: 'Status',
      subOptions: ['Open', 'Closed'],
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
          title={`Received Complaint  (${data.length})`}
          description="Complaint Subscription (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/received-complaint`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="description"
        columns={columns}
        data={data}
        onSearch={handleSearch} 
        filters={filters}
      />
    </>
  );
};

export default ComplaintManagementUserPage;
