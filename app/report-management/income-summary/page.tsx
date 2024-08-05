// app/dashboard/user-management/income-summary/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { IncomeSummary } from '@/components/analytics/IncomeSummary';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Report and Analytics', 
        link: '/report-management/incomeSummary'},
    { title: 'Income Summary', 
        link: '/report-management/incomeSummary' }
];

export default function IncomeSummaryPage() {
  return (
    <MainLayout meta={{ title: 'Income Summary' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <IncomeSummary/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
