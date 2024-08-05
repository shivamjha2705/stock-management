'use client';

import React, { useState, useEffect } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Search, Trash, Download, FileText } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TableData {
  invoice: string;
  date: string;
  customer: string;
  category: string;
  status: string;
  paidAmount: number;
  dueAmount: number;
  paymentDate: string;
  amount: number;
  description?: string;
}

export const InvoiceSummary: React.FC = () => {
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [customer, setCustomer] = useState('');
  const [status, setStatus] = useState('');
  const [report, setReport] = useState('Invoice Summary');
  const [duration, setDuration] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [totalInvoice, setTotalInvoice] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [activeTab, setActiveTab] = useState('Summary');

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    setStartMonth(currentMonth);
    setEndMonth(currentMonth);
  }, []);

  const handleSearch = () => {
    const calculatedDuration = `${startMonth} to ${endMonth}`;
    setDuration(calculatedDuration);

    const dummyData: TableData[] = [
      { invoice: 'INV001', date: '2023-01-01', customer: 'Customer 1', category: 'Sales', status: 'Paid', paidAmount: 800, dueAmount: 200, paymentDate: '2023-01-05', amount: 1000 },
      { invoice: 'INV002', date: '2023-02-01', customer: 'Customer 2', category: 'Services', status: 'Unpaid', paidAmount: 0, dueAmount: 2000, paymentDate: '', amount: 2000 },
      // Add more dummy data as needed
    ];

    setTableData(dummyData);

    const totalInvoice = dummyData.reduce((acc, item) => acc + item.amount, 0);
    const totalPaid = dummyData.reduce((acc, item) => acc + item.paidAmount, 0);
    const totalDue = totalInvoice - totalPaid;

    setTotalInvoice(totalInvoice);
    setTotalPaid(totalPaid);
    setTotalDue(totalDue);

    setShowSummary(true);
  };

  const handleDelete = () => {
    setStartMonth('');
    setEndMonth('');
    setCustomer('');
    setStatus('');
    setDuration('');
    setShowSummary(false);
    setTableData([]);
    setTotalInvoice(0);
    setTotalPaid(0);
    setTotalDue(0);
  };

  const filteredTableData = tableData.filter((data) =>
    data.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const graphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Invoices',
        data: [0, 0.5, 0.8, 0.4, 1.2, 0.9, 0.3, 0.6, 0.4, 0.7, 0.9, 1.0],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.5)',
        fill: false,
      },
    ],
  };

  const graphOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Invoice Summary',
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-start justify-between">
        <Heading
          title="Invoice Summary"
          description="View and manage your invoice summaries"
        />
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="mr-2" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2" />
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex-grow overflow-auto">
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
            <div className="flex-grow"></div>
            <div>
              <label htmlFor="startMonth" className="block text-sm font-medium text-gray-400">Start Month</label>
              <input
                type="month"
                id="startMonth"
                className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full"
                value={startMonth}
                onChange={(e) => setStartMonth(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="endMonth" className="block text-sm font-medium text-gray-400">End Month</label>
              <input
                type="month"
                id="endMonth"
                className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full"
                value={endMonth}
                onChange={(e) => setEndMonth(e.target.value)}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label className="text-sm font-medium text-gray-500">Customer</label>
              <select
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="bg-gray-900 text-white py-1"
              >
                <option value="" disabled>Select customer</option>
                <option value="customer1">Customer 1</option>
                <option value="customer2">Customer 2</option>
              </select>
            </div>
            <div className="flex flex-col flex-grow">
              <label className="text-sm font-medium text-gray-500">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-gray-900 text-white py-1"
              >
                <option value="" disabled>Select status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="unpaid">Unpaid</option>
                <option value="partially_paid">Partially Paid</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <Button onClick={handleSearch} variant="outline" className="bg-yellow-500 text-black">
                  <Search className="mr-2" />
                </Button>
                <Button onClick={handleDelete} variant="destructive" className="bg-red-500 text-white">
                  <Trash className="mr-2" />
                </Button>
              </div>
            </div>
          </div>

          {showSummary && (
            <>
              <div className="bg-gray-800 p-4 rounded-lg text-white">
                <div className="grid grid-cols-4 gap-3">
                  <div className="col-span-2">
                    <p className="font-bold">Report:</p>
                    <p>{report}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-bold">Duration:</p>
                    <p>{duration}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div>
                    <p className="font-bold">Total Invoice:</p>
                    <p>Rs {totalInvoice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="font-bold">Total Paid:</p>
                    <p>Rs {totalPaid.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="font-bold">Total Due:</p>
                    <p>Rs {totalDue.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex space-x-4">
                  <Button
                    onClick={() => setActiveTab('Summary')}
                    variant={activeTab === 'Summary' ? 'default' : 'outline'}
                    className={activeTab === 'Summary' ? 'bg-yellow-500 text-black' : ''}
                  >
                    Summary
                  </Button>
                  <Button
                    onClick={() => setActiveTab('Invoices')}
                    variant={activeTab === 'Invoices' ? 'default' : 'outline'}
                    className={activeTab === 'Invoices' ? 'bg-yellow-500 text-black' : ''}
                  >
                    Invoices
                  </Button>
                </div>

                {activeTab === 'Summary' && (
                  <div className="mt-4">
                    <Line data={graphData} options={graphOptions} />
                  </div>
                )}

                {activeTab === 'Invoices' && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border-b p-2 text-center">Invoice</th>
                          <th className="border-b p-2 text-center">Date</th>
                          <th className="border-b p-2 text-center">Customer</th>
                          <th className="border-b p-2 text-center">Category</th>
                          <th className="border-b p-2 text-center">Status</th>
                          <th className="border-b p-2 text-center">Paid Amount</th>
                          <th className="border-b p-2 text-center">Due Amount</th>
                          <th className="border-b p-2 text-center">Payment Date</th>
                          <th className="border-b p-2 text-center">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTableData.length > 0 ? (
                          filteredTableData.map((data, index) => (
                            <tr key={index}>
                              <td className="border-b p-2 text-center">{data.invoice}</td>
                              <td className="border-b p-2 text-center">{data.date}</td>
                              <td className="border-b p-2 text-center">{data.customer}</td>
                              <td className="border-b p-2 text-center">{data.category}</td>
                              <td className="border-b p-2 text-center">{data.status}</td>
                              <td className="border-b p-2 text-center">{data.paidAmount}</td>
                              <td className="border-b p-2 text-center">{data.dueAmount}</td>
                              <td className="border-b p-2 text-center">{data.paymentDate}</td>
                              <td className="border-b p-2 text-center">{data.amount}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={9} className="p-4 text-center">No entries found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
