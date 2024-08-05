import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { UserForm } from '@/components/forms/user-management/UserForm';

const breadcrumbItems = [{ title: 'User Management', link: '/dashboard/user-management' }];

export default function UserFormPage() {
  return (
    <MainLayout meta={{ title: 'User Management' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UserForm />
      </div>
    </MainLayout>
  );
}
