// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import {  OrderView } from '@/components/forms/orderForm/OrderForms';
import { SettingForm } from '@/components/forms/settingsForm/SettingForms';
import MainLayout from '@/components/layout/main-layout';

const breadcrumbItems = [
    { title: 'Order', 
        link: '/order-management'},
    ];

export default function OrderSettings() {
  return (
    <MainLayout meta={{ title: 'Order Settings' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <OrderView/>
      </div>
    </MainLayout>
  );
}

