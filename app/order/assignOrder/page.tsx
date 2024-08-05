// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { ModifyDelivery } from '@/components/forms/modifyDelivery/ModifyDelivery';
import OrderView from '@/components/forms/orderForm/OrderForms';
import MainLayout from '@/components/layout/main-layout';

const breadcrumbItems = [{ title: 'Order Management', link: '/dashboard/order-management' }];

export default function AssignOrderPage() {
  return (
    <MainLayout meta={{ title: 'Assign Items/Routes' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ModifyDelivery/>
      </div>
    </MainLayout>
  );
}

