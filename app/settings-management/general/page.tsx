// app/dashboard/user-management/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { SettingForm } from '@/components/forms/settingsForm/SettingForms';
import MainLayout from '@/components/layout/main-layout';

const breadcrumbItems = [
    { title: 'Settings', 
        link: '/settings-management/general'},
        { title: 'General Settings', 
            link: '/settings-management/general' }
    ];

export default function GeneralSettings() {
  return (
    <MainLayout meta={{ title: 'General Settings' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SettingForm/>
      </div>
    </MainLayout>
  );
}

