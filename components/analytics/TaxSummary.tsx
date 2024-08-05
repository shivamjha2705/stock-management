'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash, Download } from 'lucide-react';

interface TableData {
  month: string;
  income: string;
  expense: string;
}

export const TaxSummary: React.FC = () => {
  const [year, setYear] = useState('2024');
  const [report, setReport] = useState('Tax Summary');
  const [duration, setDuration] = useState('Jan-2024 to Dec-2024');
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleSearch = () => {
    // Fetch or calculate the table data here
    const dummyData: TableData[] = [
      { month: 'January', income: 'Income tax not found', expense: 'Expense tax not found' },
      // Add more dummy data as needed
    ];
    setTableData(dummyData);
    setShowSummary(true);
  };

  const handleDelete = () => {
    setYear('');
    setShowSummary(false);
    setTableData([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-start justify-between">
        <Heading
          title="Tax Summary"
          description="View and manage your tax summaries"
        />
        <div className="flex space-x-2">
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
              <label htmlFor="year" className="block text-sm font-medium text-gray-400">Year</label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-bold">Report:</p>
                    <p>{report}</p>
                  </div>
                  <div>
                    <p className="font-bold">Duration:</p>
                    <p>{duration}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-2 text-center">TAX</th>
                      <th className="border-b p-2 text-center">JANUARY</th>
                      <th className="border-b p-2 text-center">FEBRUARY</th>
                      <th className="border-b p-2 text-center">MARCH</th>
                      <th className="border-b p-2 text-center">APRIL</th>
                      <th className="border-b p-2 text-center">MAY</th>
                      <th className="border-b p-2 text-center">JUNE</th>
                      <th className="border-b p-2 text-center">JULY</th>
                      <th className="border-b p-2 text-center">AUGUST</th>
                      <th className="border-b p-2 text-center">SEPTEMBER</th>
                      <th className="border-b p-2 text-center">OCTOBER</th>
                      <th className="border-b p-2 text-center">NOVEMBER</th>
                      <th className="border-b p-2 text-center">DECEMBER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length > 0 ? (
                      tableData.map((data, index) => (
                        <tr key={index}>
                          <td className="border-b p-2 text-center">Income</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                          <td className="border-b p-2 text-center">{data.income}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={13} className="p-4 text-center">Income tax not found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <table className="w-full border-collapse mt-4">
                  <thead>
                    <tr>
                      <th className="border-b p-2 text-center">TAX</th>
                      <th className="border-b p-2 text-center">JANUARY</th>
                      <th className="border-b p-2 text-center">FEBRUARY</th>
                      <th className="border-b p-2 text-center">MARCH</th>
                      <th className="border-b p-2 text-center">APRIL</th>
                      <th className="border-b p-2 text-center">MAY</th>
                      <th className="border-b p-2 text-center">JUNE</th>
                      <th className="border-b p-2 text-center">JULY</th>
                      <th className="border-b p-2 text-center">AUGUST</th>
                      <th className="border-b p-2 text-center">SEPTEMBER</th>
                      <th className="border-b p-2 text-center">OCTOBER</th>
                      <th className="border-b p-2 text-center">NOVEMBER</th>
                      <th className="border-b p-2 text-center">DECEMBER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length > 0 ? (
                      tableData.map((data, index) => (
                        <tr key={index}>
                          <td className="border-b p-2 text-center">Expense</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                          <td className="border-b p-2 text-center">{data.expense}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={13} className="p-4 text-center">Expense tax not found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
