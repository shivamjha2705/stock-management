'use client';

import React, { ReactNode, MouseEventHandler } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FaFileExport } from 'react-icons/fa';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick} className="bg-gray-800 text-gray-400 p-2 rounded-md">
    {children}
  </button>
);

export const ProductStock: React.FC = () => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="Product Stock"
          description="Detailed product stock report"
        />
        <div className="flex space-x-2">
          <Button onClick={() => { /* handle export logic */ }}>
            <FaFileExport />
          </Button>
        </div>
      </div>
      <Separator />
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <select id="entriesPerPage" className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1">
              <option value="10">10</option>
              <option value="20">20</option>
              {/* Add more options if needed */}
            </select>
            <label htmlFor="entriesPerPage" className="ml-2 text-sm font-medium text-gray-400">
              entries per page
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-gray-400">
            <thead>
              <tr>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">PRODUCT NAME</th>
                <th className="px-4 py-2">QUANTITY</th>
                <th className="px-4 py-2">TYPE</th>
                <th className="px-4 py-2">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="text-center py-4">No entries found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
