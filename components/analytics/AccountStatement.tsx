'use client';

import { useState, useEffect } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Search, Trash, Download, FileText } from 'lucide-react';

export const AccountStatement: React.FC = () => {
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [account, setAccount] = useState('cash');
  const [category, setCategory] = useState('revenue');
  const [report, setReport] = useState('Account Statement Summary');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);


  interface TableData {
    date: string;
    amount: string;
    description: string;
  }
  const [tableData, setTableData] = useState<TableData[]>([]);


  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    setStartMonth(currentMonth);
    setEndMonth(currentMonth);
  }, []);

  const handleSearch = () => {
    const startDate = new Date(startMonth);
    const endDate = new Date(endMonth);
    const calculatedDuration = `${startMonth} to ${endMonth}`;
    setDuration(calculatedDuration);

    // Dummy data
    const dummyData: TableData[] = [
      { date: '2023-01-01', amount: '$1000', description: 'Sample description 1' },
      { date: '2023-02-01', amount: '$2000', description: 'Sample description 2' },
      { date: '2023-03-01', amount: '$1500', description: 'Sample description 3' },
      { date: '2023-04-01', amount: '$2500', description: 'Sample description 4' },
      { date: '2023-05-01', amount: '$3000', description: 'Sample description 5' },
      { date: '2023-06-01', amount: '$3500', description: 'Sample description 6' },
      { date: '2023-07-01', amount: '$4000', description: 'Sample description 7' },
      { date: '2023-08-01', amount: '$4500', description: 'Sample description 8' },
      { date: '2023-09-01', amount: '$5000', description: 'Sample description 9' },
      { date: '2023-10-01', amount: '$5500', description: 'Sample description 10' },
    ];
    
    setTableData(dummyData);

    setShowSummary(true);
  };

  const handleDelete = () => {
    setStartMonth('');
    setEndMonth('');
    setAccount('cash');
    setCategory('revenue');
    setType('');
    setDuration('');
    setShowSummary(false);
    setTableData([]);
  };

  const filteredTableData = tableData.filter((data) =>
    data.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <Heading
          title="Account Statement Summary"
          description="View and manage your account statements"
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


      
      <div className="flex flex-col space-y-4 mt-4">
        <div className="flex items-center space-x-4 p-4 rounded-lg">
          <div className="flex-grow"></div>
          <div>
            <label htmlFor="startMonth" className="block text-sm font-medium text-gray-400">Start Month</label>
            <Input
              type="month"
              id="startMonth"
              className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="endMonth" className="block text-sm font-medium text-gray-400">End Month</label>
            <input
              type="month"
              id="endMonth"
              className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-sm font-medium text-gray-500">Account</label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="bg-gray-900 text-white py-1"
            >
              <option value="" disabled>Select account</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
            </select>
          </div>
          <div className="flex flex-col flex-grow">
            <label className="text-sm font-medium text-gray-500">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-900 text-white py-1"
            >
              <option value="" disabled>Select category</option>
              <option value="revenue">Revenue</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <Button onClick={handleSearch} variant="outline" className="bg-yellow-500 text-black">
                <Search className="" />
               
              </Button>
              <Button onClick={handleDelete} variant="destructive" className="bg-red-500 text-white">
                <Trash className="" />
               
              </Button>
            </div>
          </div>
        </div>

        {showSummary && (
          <>
            <div className="bg-gray-800 p-4 rounded-lg text-white">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <p className="font-bold">Report:</p>
                  <p>{report}</p>
                </div>
                <div>
                  <p className="font-bold">Account:</p>
                  <p>{account}</p>
                </div>
                <div>
                  <p className="font-bold">Type:</p>
                  <p>{category}</p>
                </div>
                <div>
                  <p className="font-bold">Duration:</p>
                  <p>{duration}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
           
            <select id="entriesPerPage" className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1">
              <option value="10">10</option>
              <option value="10">20</option>
              <option value="10">30</option>
              {/* Add more options if needed */}
            </select>
            <label htmlFor="entriesPerPage" className="text-sm font-medium text-gray-400">entries per page</label>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1"
          />
        </div>

              <div className="mt-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-2 text-center">Date</th>
                      <th className="border-b p-2 text-center">Amount</th>
                      <th className="border-b p-2 text-center">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTableData.length > 0 ? (
                      filteredTableData.map((data, index) => (
                        <tr key={index}>
                          <td className="border-b p-2 text-center">{data.date}</td>
                          <td className="border-b p-2 text-center">{data.amount}</td>
                          <td className="border-b p-2 text-center">{data.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="p-4 text-center">No entries found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
