import BreadCrumb from '@/components/breadcrumb';
import { CreateProfileOne } from '@/components/forms/user-profile-stepper/create-profile';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Customer', link: '/customer' }];
export default function page() {
  return (
    <MainLayout meta={{ title: '' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProfileOne isDisabled={false} initialData={null} />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
