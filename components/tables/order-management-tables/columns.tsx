'use client';

import { ColumnDef } from '@tanstack/react-table';
import { OrderManagement } from '@/constants/order-management-data';
import { CellAction } from './cell-action';
import { Check, Edit, X } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Adjust the import path as necessary

export const columns: ColumnDef<OrderManagement>[] = [
  {
    accessorKey: 'orderId',
    header: 'Order ID',
    cell: ({ row }) => <span>{row.original.orderId}</span>,
  },
  {
    accessorKey: 'empId',
    header: 'Emp ID',
    cell: ({ row }) => <span>{row.original.empId}</span>,
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name',
    cell: ({ row }) => <span>{row.original.customerName}</span>,
  },
  {
    accessorKey: 'deliveries',
    header: 'Deliveries',
    cell: ({ row }) => (
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className='bg-red-100'>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-10 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time Slot</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Assigned Employee</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Assigned Routes</th>
              {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {row.original.deliveries.slice(0, 1).map((delivery, index) => (
              <tr key={index} className='bg-blue-100'>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">{delivery.deliveryDate}</td>
                <td className="ps-10 pe-8 py-2 whitespace-nowrap text-sm text-gray-900">{delivery.deliveryTimeSlot}</td>
                {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  <div 
                    style={{ borderRadius: "20px" }}
                    className={`flex items-center px-1 py-1 ${
                      delivery.deliveryStatus === 'Delivered' ? 'bg-green-400' :
                      delivery.deliveryStatus === 'Pending' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}
                  >
                    <span className='text-black bold'>{delivery.deliveryStatus}</span>
                  </div>
                </td> */}
                <td className="px-1 py-2 whitespace-nowrap text-sm text-gray-900">
                          <div 
                            style={{ borderRadius: "20px" }}
                            className={`flex items-center ps-3 pe-2  py-1 ${
                              delivery.deliveryStatus === 'Delivered' ? 'bg-green-400' :
                              delivery.deliveryStatus === 'Pending' ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                          >
                            <span className='text-black bold pe-7'>{delivery.deliveryStatus}</span>
                          </div>
                          </td>
                <td className="px-8 py-2 whitespace-nowrap text-sm text-gray-900">{delivery.assignedEmployee}</td>
                <td className="px-12 py-2 whitespace-nowrap text-sm text-gray-900">{delivery.assignedRoutes}</td>
                {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600"><Edit height="16" width="16" /></td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {row.original.deliveries.length > 1 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="more-deliveries">
              <AccordionTrigger>View All</AccordionTrigger>
              <AccordionContent>
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {row.original.deliveries.slice(1).map((delivery, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'}>
                        <td className="ps-2 py-2 whitespace-nowrap text-sm text-gray-900">{delivery.deliveryDate}</td>
                        <td className="ps-0 py-2 whitespace-nowrap text-sm text-gray-900">{delivery.deliveryTimeSlot}</td>
                        <td className="px-1 py-2 whitespace-nowrap text-sm text-gray-900">
                          <div 
                            style={{ borderRadius: "20px" }}
                            className={`flex items-center px-2 py-1 ${
                              delivery.deliveryStatus === 'Delivered' ? 'bg-green-400' :
                              delivery.deliveryStatus === 'Pending' ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                          >
                            <span className='text-black bold'>{delivery.deliveryStatus}</span>
                          </div>
                        </td>
                        <td className="ps-10 py-2 whitespace-nowrap text-sm text-gray-900">{delivery.assignedEmployee}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{delivery.assignedRoutes}</td>
                        {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600"><Edit height="16" width="16" /></td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    ),
  },
  {
    accessorKey: 'subscriptionType',
    header: 'Subscription Type',
  },
  {
    accessorKey: 'totalWeight',
    header: 'Total Maximum Bag Weight (gms)',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className='text-center'>{row.original.totalWeight}</span>
      </div>
    ),
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price (₹)',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span className='text-center'>{row.original.totalPrice}</span>
      </div>
    ),
  },
  // {
  //   accessorKey: 'addons',
  //   header: 'Add-ons',
  //   cell: ({ row }) => (
  //     <ul>
  //       {row.original.addons?.map((addon, index) => (
  //         <li style={{ listStyleType: "square" }} key={index}>{addon}</li>
  //       ))}
  //     </ul>
  //   ),
  // },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => (
      <div 
        style={{ borderRadius: "20px" }}
        className={`flex items-center px-2 py-1 ${
          row.original.paymentStatus === 'Paid' ? 'bg-green-400' : 'bg-red-400'
        }`}
      >
        {row.original.paymentStatus === 'Paid' ? (
          <Check width={16} height={16} className="text-green-500 mr-2" />
        ) : (
          <X width={16} height={16} className="text-red-900 mr-2" />
        )}
        <span className='text-black bold'>{row.original.paymentStatus}</span>
      </div>
    ),
  },
  {
    accessorKey: 'specialInstructions',
    header: 'Special Instructions',
    cell: ({ row }) => (
      <div className="flex">
        <span className=''>{row.original.specialInstructions}</span>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
