// app/dashboard/user-management/bill-summary/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { BillSummary } from '@/components/analytics/BillSummary';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Reports and Analytics', link: '/report' },
    { title: 'Bill Summary', link: '/report-management/billSummary' }
];

export default function BillSummaryPage() {
  return (
    <MainLayout meta={{ title: 'Bill Summary' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <BillSummary />
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
