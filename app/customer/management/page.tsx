// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { CustomerManagementClient } from '@/components/tables/customer-management-tables/client';

const breadcrumbItems = [{ title: 'Customer Management', link: '/customer/management' }];

export default function SubscriptionManagementPage() {
  return (
    <MainLayout meta={{ title: 'Customer Management' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CustomerManagementClient  />
      </div>
    </MainLayout>
  );
}

