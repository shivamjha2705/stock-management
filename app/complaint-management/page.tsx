// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ComplaintManagementClient } from '@/components/tables/complaint-management-tables/client';
import ComplaintManagementUserPage from '@/components/tables/user-complaint-management-tables/client';

const breadcrumbItems = [{ title: 'Complaint Management', link: '/dashboard/complaint-management' }];

export default function SubscriptionManagementPage() {
  return (
    <MainLayout meta={{ title: 'Complaint Management' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ComplaintManagementClient  />
        <ComplaintManagementUserPage  />
      </div>
    </MainLayout>
  );
}

