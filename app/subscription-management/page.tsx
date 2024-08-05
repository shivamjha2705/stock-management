// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { SubscriptionManagementClient } from '@/components/tables/subscription-management-tables/client';

const breadcrumbItems = [{ title: 'Subscription Management', link: '/dashboard/subscription-management' }];

export default function SubscriptionManagementPage() {
  return (
    <MainLayout meta={{ title: 'Subscription Management' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SubscriptionManagementClient  />
      </div>
    </MainLayout>
  );
}

