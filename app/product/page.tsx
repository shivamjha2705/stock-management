import BreadCrumb from '@/components/breadcrumb';
import { CreateOrder } from '@/components/forms/order-stepper/create-order';
import { CreateProductForm } from '@/components/forms/product-stepper/create-product';
import { CreateSubscriptionOne } from '@/components/forms/subscription-stepper/create-subscription';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Product', link: '/dashboard/product' }];
export default function page() {
  return (
    <MainLayout meta={{ title: 'Product Management' }}>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CreateProductForm  initialData={null} />
      </div>
    </ScrollArea>
    </MainLayout>
  );
}
