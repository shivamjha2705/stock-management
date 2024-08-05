import BreadCrumb from '@/components/breadcrumb';
import { CreateOrder } from '@/components/forms/order-stepper/create-order';
import { CreateSubscriptionOne } from '@/components/forms/subscription-stepper/create-subscription';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Order', link: '/dashboard/order' }];
export default function page() {
  return (
    <MainLayout meta={{ title: 'Order Management' }}>

    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateOrder initialData={null} />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
