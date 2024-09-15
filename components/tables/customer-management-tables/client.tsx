'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '@/app/redux/slices/customerSlice';
import { RootState, AppDispatch } from '@/app/redux/store';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

export const CustomerManagementClient: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const { customers, loading, error } = useSelector((state: RootState) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleSearch = (searchValue: string) => {
    // Implement search logic if needed
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Customer (${customers?.length})`}
          description="Manage Employee (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/customer`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={customers} // Using Redux state data here
        onSearch={handleSearch}
      />
    </>
  );
};
