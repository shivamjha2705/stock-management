'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FaFileExport, FaSearch, FaTrash } from 'react-icons/fa';


type ButtonProps = {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => (
  <button className={`${className} text-yellow-400 p-2 rounded-md`} onClick={onClick}>
    {children}
  </button>
);

export const CashFlow: React.FC = () => {
  const [view, setView] = useState('quarterly');

  const renderQuarterlyContent = () => (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900 p-4 rounded-md">
          <p className="text-sm font-medium text-gray-400">Report :</p>
          <p className="text-lg font-semibold text-white">Quarterly Cashflow</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-md">
          <p className="text-sm font-medium text-gray-400">Duration :</p>
          <p className="text-lg font-semibold text-white">Jan-2024 to Dec-2024</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-2">Income</h3>
        <table className="min-w-full bg-gray-900 text-gray-400 mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">CATEGORY</th>
              <th className="px-4 py-2">JAN-MAR</th>
              <th className="px-4 py-2">APR-JUN</th>
              <th className="px-4 py-2">JUL-SEP</th>
              <th className="px-4 py-2">OCT-DEC</th>
              <th className="px-4 py-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Revenue :</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Invoice :</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Total Income = Revenue + Invoice</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold text-white mb-2">Expense</h3>
        <table className="min-w-full bg-gray-900 text-gray-400 mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">CATEGORY</th>
              <th className="px-4 py-2">JAN-MAR</th>
              <th className="px-4 py-2">APR-JUN</th>
              <th className="px-4 py-2">JUL-SEP</th>
              <th className="px-4 py-2">OCT-DEC</th>
              <th className="px-4 py-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Payment :</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Bill :</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Total Expense = Payment + Bill</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
          </tbody>
        </table>
        <div className="bg-gray-900 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-white mb-2">Net Profit</h3>
          <p className="font-semibold text-gray-400">NET PROFIT = TOTAL INCOME - TOTAL EXPENSE</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-lg font-semibold text-white">Net Profit</p>
            <p className="text-lg font-semibold text-white">₹0.00</p>
          </div>
        </div>
      </div>
    </>
  );

  const renderMonthlyContent = () => (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900 p-4 rounded-md">
          <p className="text-sm font-medium text-gray-400">Report :</p>
          <p className="text-lg font-semibold text-white">Monthly Cashflow</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-md">
          <p className="text-sm font-medium text-gray-400">Duration :</p>
          <p className="text-lg font-semibold text-white">Jan-2024 to Dec-2024</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-2">Income</h3>
        <table className="min-w-full bg-gray-900 text-gray-400 mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">CATEGORY</th>
              <th className="px-4 py-2">JAN</th>
              <th className="px-4 py-2">FEB</th>
              <th className="px-4 py-2">MAR</th>
              <th className="px-4 py-2">APR</th>
              <th className="px-4 py-2">MAY</th>
              <th className="px-4 py-2">JUN</th>
              <th className="px-4 py-2">JUL</th>
              <th className="px-4 py-2">AUG</th>
              <th className="px-4 py-2">SEP</th>
              <th className="px-4 py-2">OCT</th>
              <th className="px-4 py-2">NOV</th>
              <th className="px-4 py-2">DEC</th>
              <th className="px-4 py-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Revenue :</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Invoice :</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Total Income = Revenue + Invoice</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-lg font-semibold text-white mb-2">Expense</h3>
        <table className="min-w-full bg-gray-900 text-gray-400 mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2">CATEGORY</th>
              <th className="px-4 py-2">JAN</th>
              <th className="px-4 py-2">FEB</th>
              <th className="px-4 py-2">MAR</th>
              <th className="px-4 py-2">APR</th>
              <th className="px-4 py-2">MAY</th>
              <th className="px-4 py-2">JUN</th>
              <th className="px-4 py-2">JUL</th>
              <th className="px-4 py-2">AUG</th>
              <th className="px-4 py-2">SEP</th>
              <th className="px-4 py-2">OCT</th>
              <th className="px-4 py-2">NOV</th>
              <th className="px-4 py-2">DEC</th>
              <th className="px-4 py-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Payment :</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Bill :</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Total Expense = Payment + Bill</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
              <td className="px-4 py-2">₹0.00</td>
            </tr>
          </tbody>
        </table>
        <div className="bg-gray-900 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-white mb-2">Net Profit</h3>
          <p className="font-semibold text-gray-400">NET PROFIT = TOTAL INCOME - TOTAL EXPENSE</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-lg font-semibold text-white">Net Profit</p>
            <p className="text-lg font-semibold text-white">₹0.00</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <Heading
          title={`Cash Flow`}
          description="Detailed cash flow report"
        />
        <Button className="bg-gray-800">
          <FaFileExport />
        </Button>
      </div>
      <Separator />
      <div className="mt-6">
        <div className="flex space-x-2 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${view === 'monthly' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
            onClick={() => setView('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-md ${view === 'quarterly' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
            onClick={() => setView('quarterly')}
          >
            Quarterly
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="year" className="text-sm font-medium text-gray-400">Year</label>
            <select id="year" className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1">
              <option value="2024">2024</option>
              {/* Add more options if needed */}
            </select>
            <Button className="bg-gray-800">
              <FaSearch />
            </Button>
            <Button className="bg-gray-800">
              <FaTrash />
            </Button>
          </div>
        </div>
        {view === 'monthly' ? renderMonthlyContent() : renderQuarterlyContent()}
      </div>
    </>
  );
};
