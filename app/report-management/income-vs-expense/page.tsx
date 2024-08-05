// app/dashboard/user-management/income-vs-expense/page.tsx
import BreadCrumb from '@/components/breadcrumb';
import { IncomeVsExpense } from '@/components/analytics/IncomeVsExpense';
import MainLayout from '@/components/layout/main-layout';
import { ScrollArea } from '@/components/ui/scroll-area';
const breadcrumbItems = [
    { title: 'Report and Analytics', 
        link: '/report-management/incomeVsExpense'},
    { title: 'Income vs Expense', 
        link: '/report-management/incomeVsExpense' }
];

export default function IncomeVsExpensePage() {
  return (
    <MainLayout meta={{ title: 'Income vs Expense' }}>
        <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 min-h-screen p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <IncomeVsExpense/>
      </div>
      </ScrollArea>
    </MainLayout>
  );
}
