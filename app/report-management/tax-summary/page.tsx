// app/dashboard/user-management/tax-summary/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { TaxSummary } from '@/components/analytics/TaxSummary';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [
  { title: 'Reports and Analytics', link: '/report' },
  { title: 'Tax Summary', link: '/report-management/taxSummary' }
];

export default function TaxSummaryPage() {
  return (
    <MainLayout meta={{ title: 'Tax Summary' }}>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <TaxSummary />
        </div>
      </ScrollArea>
    </MainLayout>
  );
}
