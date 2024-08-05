// app/dashboard/user-management/sales-report/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { SalesReport } from '@/components/analytics/SalesReport';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
  { title: 'Reports and Analytics', link: '/report' },
  { title: 'Sales Report', link: '/report-management/salesReport' }
];

export default function SalesReportPage() {
  return (
    <MainLayout meta={{ title: 'Sales Report' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <SalesReport />
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
