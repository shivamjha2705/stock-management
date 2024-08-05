'use client';

import React, { useState, ReactNode } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FaFileExport, FaDownload, FaSearch, FaTrash } from 'react-icons/fa';
import { Button as UIButton } from '@/components/ui/button'; // Renamed imported Button to UIButton

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`${className} text-yellow-400 p-2 rounded-md`}>
    {children}
  </button>
);

export const Transaction: React.FC = () => {
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [account, setAccount] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('Jul-2024 to Feb-2024');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const start = new Date(startMonth);
    const end = new Date(endMonth);
    const formattedStart = start.toLocaleString('default', { month: 'short', year: 'numeric' });
    const formattedEnd = end.toLocaleString('default', { month: 'short', year: 'numeric' });
    setDuration(`${formattedStart} to ${formattedEnd}`);
  };

  const handleDelete = () => {
    setStartMonth('');
    setEndMonth('');
    setAccount('');
    setCategory('');
    setDuration('');
    setSearchTerm('');
  };

  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <Heading
          title={`Transaction Summary`}
          description="Detailed transaction report"
        />
        <div className="flex space-x-2">
          <UIButton className="bg-gray-800" onClick={() => { /* handle export logic */ }}>
            <FaFileExport />
          </UIButton>
          <UIButton className="bg-gray-800" onClick={() => { /* handle download logic */ }}>
            <FaDownload />
          </UIButton>
        </div>
      </div>
      <Separator />
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
          <div>
            <label htmlFor="startMonth" className="block text-sm font-medium text-gray-400">Start Month</label>
            <input
              type="month"
              id="startMonth"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="endMonth" className="block text-sm font-medium text-gray-400">End Month</label>
            <input
              type="month"
              id="endMonth"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div>
            <label htmlFor="account" className="block text-sm font-medium text-gray-400">Account</label>
            <select 
              id="account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full"
            >
              <option value="">Select Account</option>
              <option value="stripe_paypal">Stripe/Paypal</option>
              <option value="cash">Cash</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-400">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full"
            >
              <option value="">Select Category</option>
              <option value="bill">Bill</option>
              <option value="invoice">Invoice</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="flex justify-end items-center mb-4 space-x-2">
          <Button className="bg-gray-800" onClick={handleSearch}>
            <FaSearch />
          </Button>
          <Button className="bg-gray-800" onClick={handleDelete}>
            <FaTrash />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-400">Report :</p>
            <p className="text-lg font-semibold text-white">Transaction Summary</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-400">Duration :</p>
            <p className="text-lg font-semibold text-white">{duration}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <select id="entriesPerPage" className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              {/* Add more options if needed */}
            </select>
            <label htmlFor="entriesPerPage" className="text-sm font-medium text-gray-400">entries per page</label>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-gray-400 mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">ACCOUNT</th>
                <th className="px-4 py-2">TYPE</th>
                <th className="px-4 py-2">CATEGORY</th>
                <th className="px-4 py-2">DESCRIPTION</th>
                <th className="px-4 py-2">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-4">No entries found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
