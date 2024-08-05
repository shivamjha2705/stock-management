// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { OrderManagementClient } from '@/components/tables/order-management-tables/client';

const breadcrumbItems = [{ title: 'Order Management', link: '/dashboard/order-management' }];

export default function OrderManagementPage() {
  return (
    <MainLayout meta={{ title: 'Order Management' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <OrderManagementClient  />
      </div>
    </MainLayout>
  );
}

