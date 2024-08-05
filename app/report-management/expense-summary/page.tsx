// app/dashboard/user-management/expense-summary/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { ExpenseSummary } from '@/components/analytics/ExpenseSummary';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Report and Analytics', 
        link: '/report-management/expenseSummary'},
    { title: 'Expense Summary', 
        link: '/report-management/expenseSummary' }
];

export default function ExpenseSummaryPage() {
  return (
    <MainLayout meta={{ title: 'Expense Summary' }}>
        <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <ExpenseSummary/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
