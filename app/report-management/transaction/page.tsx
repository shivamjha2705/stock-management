// app/dashboard/user-management/transaction/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { Transaction } from '@/components/analytics/Transaction';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Report and Analytics', 
        link: '/report-management/transaction'},
    { title: 'Transaction', 
        link: '/report-management/transaction' }
];

export default function TransactionPage() {
  return (
    <MainLayout meta={{ title: 'Transaction' }}>
        <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Transaction/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
