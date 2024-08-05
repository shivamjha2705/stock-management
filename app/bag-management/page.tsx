import BreadCrumb from '@/components/breadcrumb';
import { BagForm } from '@/components/forms/bag-stepper/create-bag';
import { ComplaintForm } from '@/components/forms/complaint-stepper/create-complaint';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ComplaintManagementData } from '@/constants/complaint-management-data';

const breadcrumbItems = [{ title: 'Bags', link: '/dashboard/bag' }];
export default function page() {
  return (
    <MainLayout meta={{ title: 'Create Bag' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <BagForm   />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
