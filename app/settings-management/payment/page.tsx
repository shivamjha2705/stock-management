// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { SettingForm } from '@/components/forms/settingsForm/SettingForms';
import MainLayout from '@/components/layout/main-layout';

const breadcrumbItems = [
    { title: 'Settings', 
        link: '/settings-management/payment'},
        { title: 'Payments Settings', 
            link: '/settings-management/payment' }
    ];

export default function PaymentSettings() {
  return (
    <MainLayout meta={{ title: 'Payments Settings' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SettingForm/>
      </div>
    </MainLayout>
  );
}

