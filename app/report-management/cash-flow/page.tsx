// app/dashboard/user-management/cash-flow/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { CashFlow } from '@/components/analytics/CashFlow';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Report and Analytics', 
        link: '/report-management/cashFlow'},
    { title: 'Cash Flow', 
        link: '/report-management/cashFlow' }
];

export default function CashFlowPage() {
  return (
    <MainLayout meta={{ title: 'Cash Flow' }}>
      <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <CashFlow/>
      </div>
      </ScrollArea> 
    </MainLayout>
  );
}
