// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { RoutesForm } from '@/components/forms/routesForm/SettingForms';
import { SettingForm } from '@/components/forms/settingsForm/SettingForms';
import MainLayout from '@/components/layout/main-layout';

const breadcrumbItems = [
    { title: 'Manage Routes', 
        link: '/routes-management/'},
    ];

export default function RoutesManagement() {
  return (
    <MainLayout meta={{ title: 'Manage Routes' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <RoutesForm/>
      </div>
    </MainLayout>
  );
}

