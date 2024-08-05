import BreadCrumb from '@/components/breadcrumb';
import { CreateSubscriptionForm } from '@/components/forms/subscription-form/subscriptionForm';
import MainLayout from '@/components/layout/main-layout';
import { SubscriptionClient } from '@/components/tables/subscription/client';

const breadcrumbItems = [{ title: 'Subscription', link: '/dashboard/subscription' }];

export default function SubscriptionForm() {
  return (
    <MainLayout meta={{ title: 'Subscription' }}>
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        < CreateSubscriptionForm  initialData={null} />
      </div>
    </MainLayout>
  );
}
