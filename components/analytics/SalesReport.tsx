'use client';

import React, { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Filter, FileText, Printer } from 'lucide-react';

export const SalesReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'item' | 'customer'>('item');

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Sales Report" description="Detailed sales report" />
        <div className="flex space-x-2">
          <Button>
            <Filter className="mr-2" />
          </Button>
          <Button>
            <FileText className="mr-2" />
          </Button>
          <Button>
            <Printer className="mr-2" />
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex space-x-4 my-4">
        <Button
          className={activeTab === 'item' ? 'bg-yellow-500 text-black' : ''}
          onClick={() => setActiveTab('item')}
        >
          Sales by Item
        </Button>
        <Button
          className={activeTab === 'customer' ? 'bg-yellow-500 text-black' : ''}
          onClick={() => setActiveTab('customer')}
        >
          Sales by Customer
        </Button>
      </div>
      {activeTab === 'item' ? (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2">INVOICE ITEM</th>
              <th className="py-2">QUANTITY SOLD</th>
              <th className="py-2">AMOUNT</th>
              <th className="py-2">AVERAGE PRICE</th>
            </tr>
          </thead>
          <tbody>
            {/* Add your table rows here */}
          </tbody>
        </table>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2">CUSTOMER NAME</th>
              <th className="py-2">INVOICE COUNT</th>
              <th className="py-2">SALES</th>
              <th className="py-2">SALES WITH TAX</th>
            </tr>
          </thead>
          <tbody>
            {/* Add your table rows here */}
          </tbody>
        </table>
      )}
    </>
  );
};
