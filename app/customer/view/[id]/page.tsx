'use client'; // This ensures the component is rendered on the client side

import BreadCrumb from '@/components/breadcrumb';
import { CreateProfileOne } from '@/components/forms/user-profile-stepper/create-profile';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import apiCall from '@/lib/axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const breadcrumbItems = [{ title: 'Customer', link: '/customer' }];

export default function Page() {
  const params = useParams(); // Use useParams to get the route parameters
  const id = params.id; // Access the ID directly

const [data, setData] = useState(null)
  const fetchData=async()=>{
    const res=await apiCall('GET',`/customers/${id}`)
    setData(res)
    console.log(res)
  }

  useEffect(() => {
  fetchData()
  }, [id])

  return (
    <MainLayout meta={{ title: '' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProfileOne isDisabled={true} initialData={data} />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
