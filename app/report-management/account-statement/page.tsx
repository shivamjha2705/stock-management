
import { AccountStatement } from '@/components/analytics/AccountStatement';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';

import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Report And Analytics', 
        link: '/report'},
        { title: 'Account Statement', 
          link: '/report-management/accountStatement' }
    ];

export default function ReportAndAnalyticsPage() {
  return (
    <MainLayout meta={{ title: 'Report And Analytics' }}>
       <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <AccountStatement/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}