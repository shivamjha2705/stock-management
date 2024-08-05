import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { UserClient } from '@/components/tables/user-tables/client';
import { users } from '@/constants/data';

const breadcrumbItems = [{ title: 'User', link: '/dashboard/user' }];
export default function page() {
  return (
    <MainLayout meta={{ title: 'Users' }}>
      <div className="flex-1 space-y-4 min-h-screen  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} />
      </div>
    </MainLayout>
  );
}
