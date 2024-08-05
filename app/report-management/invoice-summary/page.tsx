// app/dashboard/user-management/invoice-summary/page.tsx
'use client';

import {InvoiceSummary} from '@/components/analytics/InvoiceSummary';
import BreadCrumb from '@/components/breadcrumb';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
  { title: 'Report And Analytics', link: '/report-management' },
  { title: 'Invoice Summary', link: '/report-management/invoice-summary' },
];

const InvoiceSummaryPage = () => {
  return (
    <MainLayout meta={{ title: 'Invoice Summary' }}>
        <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <InvoiceSummary />
      </div>
      </ScrollArea>
    </MainLayout>
  );
};

export default InvoiceSummaryPage;
