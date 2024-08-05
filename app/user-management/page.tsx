// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { UserManagementClient } from '@/components/tables/user-management-tables/client';
import {users} from '@/constants/data';

const breadcrumbItems = [{ title: 'Customer Management', link: '/dashboard/user-management' }];

export default function UserManagementPage() {
  return (
    <MainLayout meta={{ title: 'Customer Management' }}>
      <div className="flex-1 space-y-4  min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UserManagementClient />
      </div>
    </MainLayout>
  );
}

