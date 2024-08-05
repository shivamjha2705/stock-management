import BreadCrumb from '@/components/breadcrumb';
import { CreateSubscriptionOne } from '@/components/forms/subscription-stepper/create-subscription';
import MainLayout from '@/components/layout/main-layout';
import { BagClient } from '@/components/tables/bag-table/client';
import { SubscriptionClient } from '@/components/tables/subscription/client';

const breadcrumbItems = [{ title: 'Subscription', link: '/dashboard/subscription' }];

export default function SubscriptionPage() {
  return (
    <MainLayout meta={{ title: 'Subscription' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <BagClient />
      </div>
    </MainLayout>
  );
}