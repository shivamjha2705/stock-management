import BreadCrumb from '@/components/breadcrumb';
import { ComplaintForm } from '@/components/forms/complaint-stepper/create-complaint';
import { ReceivedComplaintForm } from '@/components/forms/received-complaint-stepper/create-received-complaint';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ComplaintManagementData } from '@/constants/complaint-management-data';

const breadcrumbItems = [{ title: 'Complaint', link: '/dashboard/complaint' }];
export default function page() {
  return (
    <MainLayout meta={{ title: 'Create Complaint' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ReceivedComplaintForm   />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
