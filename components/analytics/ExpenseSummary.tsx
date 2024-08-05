'use client';

import React, { MouseEventHandler, ReactNode } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { FaDownload, FaSearch, FaTrash } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`${className} text-yellow-400 p-2 rounded-md`}>
    {children}
  </button>
);

const data = {
  labels: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  datasets: [
    {
      label: 'Expense',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Replace with actual expense data
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    }
  ],
};

const options:ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Expense vs. Months',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Expense',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Months',
      },
    },
  },
};

export const ExpenseSummary: React.FC = () => {
  return (
    <>
      <div className="flex items-start justify-between mb-6">
        <Heading
          title={`Expense Summary`}
          description="Summary of expenses"
        />
        <Button className="bg-gray-800">
          <FaDownload />
        </Button>
      </div>
      <Separator />
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-400">Year</label>
            <select id="year" className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full">
              <option value="2024">2024</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-400">Category</label>
            <select id="category" className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full">
              <option value="">Select Category</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-gray-400">Vendor</label>
            <select id="customer" className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded-md px-2 py-1 w-full">
              <option value="">Select Vendor</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex justify-end items-center mb-4 space-x-2">
          <Button className="bg-gray-800">
            <FaSearch />
          </Button>
          <Button className="bg-gray-800">
            <FaTrash />
          </Button>
        </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-400">Report :</p>
            <p className="text-lg font-semibold text-white">Expense Summary</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-400">Duration :</p>
            <p className="text-lg font-semibold text-white">Jan-2024 to Dec-2024</p>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-md mb-6">
          <Line data={data} options={options} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-gray-400 mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2">CATEGORY</th>
                <th className="px-4 py-2">JANUARY</th>
                <th className="px-4 py-2">FEBRUARY</th>
                <th className="px-4 py-2">MARCH</th>
                <th className="px-4 py-2">APRIL</th>
                <th className="px-4 py-2">MAY</th>
                <th className="px-4 py-2">JUNE</th>
                <th className="px-4 py-2">JULY</th>
                <th className="px-4 py-2">AUGUST</th>
                <th className="px-4 py-2">SEPTEMBER</th>
                <th className="px-4 py-2">OCTOBER</th>
                <th className="px-4 py-2">NOVEMBER</th>
                <th className="px-4 py-2">DECEMBER</th>
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
                <td className="px-4 py-2 font-semibold">Total Expense = Payment + Bill :</td>
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
                <td className="px-4 py-2 font-semibold">Total :</td>
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
        </div>
      </div>
    </>
  );
};
