'use client';

import { useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { OrderManagement } from '@/constants/order-management-data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Select from 'react-select';

export const OrderData: OrderManagement[] = [
  {
    orderId: 101,
    empId: 1022,
    employeeName: "Shivam Singh",
    customerName: "Deepak Singh",
    deliveries: [
      {
        deliveryDate: '2023-07-17',
        deliveryTimeSlot: '10am - 12pm',
        deliveryStatus: 'Delivered',
        assignedEmployee: "Shivam Singh",
        assignedRoutes: "Route 1"
      },
      {
        deliveryDate: '2023-07-18',
        deliveryTimeSlot: '9am - 11am',
        deliveryStatus: 'Pending',
        assignedEmployee: "Shivam Singh",
        assignedRoutes: "Route 1"
      },
      // Add more deliveries as needed
    ],
    bagOrdered: ['Regular Veggie Bag'],
    totalWeight: 10,
    totalPrice: 779,
    addons: ['Lemons'],
    paymentStatus: 'Paid',
    specialInstructions: 'Leave the package at the front door.'
  }
];

const timeSlots = [
  { value: '8am - 10am', label: '8am - 10am' },
  { value: '10am - 12pm', label: '10am - 12pm' },
  { value: '12pm - 2pm', label: '12pm - 2pm' },
];

const deliveryStatuses = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Cancelled', label: 'Cancelled' },
];

const employees = [
  { value: 'Shivam Singh', label: 'Shivam Singh', phoneNumber: '123-456-7890' },
  { value: 'Aman Gupta', label: 'Aman Gupta', phoneNumber: '234-567-8901' },
  { value: 'John Doe', label: 'John Doe', phoneNumber: '345-678-9012' },
];

const routes = [
  { value: 'Route 1', label: 'Route 1' },
  { value: 'Route 2', label: 'Route 2' },
  { value: 'Route 3', label: 'Route 3' },
];

export const OrderView: React.FC = () => {
  const order = OrderData[0];
  const [darkMode, setDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);

  const handleEditClick = (delivery: any) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDelivery(null);
  };

  const handleSaveChanges = () => {
    // Save changes logic here
    setIsModalOpen(false);
  };

  const formatEmployeeOptionLabel = (employee: any) => (
    <div className="flex justify-between">
      <span>{employee.label}</span>
      <span className="text-gray-500">{employee.phoneNumber}</span>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex items-start justify-between">
        <Heading title="Order Details" description="View Order Details" />
      </div>
      <Separator />
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Order ID:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.orderId}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Associated Employee Name(ID):</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.employeeName}({order.empId})</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Customer Name:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.customerName}</p>
          </div>
       
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Maximum Weight (kg):</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.totalWeight}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Price(₹):</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.totalPrice}</p>
          </div>
          {/* <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Add-ons:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.addons?.join(', ') || 'None'}</p>
          </div> */}
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Payment Status:</p>
            <p className={`text-lg ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
              {order.paymentStatus}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Special Instructions:</p>
            <p className="text-lg text-gray-900 dark:text-gray-100">{order.specialInstructions}</p>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-red-100 dark:bg-red-900">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Delivery Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Time Slot
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Assigned Employee
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Assigned Route
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {order.deliveries.map((delivery, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-blue-200 dark:bg-blue-800'}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.deliveryDate}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.deliveryTimeSlot}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      delivery.deliveryStatus === 'Delivered'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}
                  >
                    {delivery.deliveryStatus}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.assignedEmployee}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{delivery.assignedRoutes}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(delivery)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDelivery && (
        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Delivery</DialogTitle>
              <DialogDescription>Update the delivery details below:</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Date</label>
                <Input
                  type="date"
                  value={selectedDelivery?.deliveryDate}
                  onChange={(e) => setSelectedDelivery({ ...selectedDelivery, deliveryDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time Slot</label>
                <Select
                  options={timeSlots}
                  value={timeSlots.find((option) => option.value === selectedDelivery?.deliveryTimeSlot)}
                  onChange={(selectedOption) =>
                    setSelectedDelivery({ ...selectedDelivery, deliveryTimeSlot: selectedOption?.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Status</label>
                <Select
                  options={deliveryStatuses}
                  value={deliveryStatuses.find((option) => option.value === selectedDelivery?.deliveryStatus)}
                  onChange={(selectedOption) =>
                    setSelectedDelivery({ ...selectedDelivery, deliveryStatus: selectedOption?.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Employee</label>
                <Select
                  options={employees}
                  formatOptionLabel={formatEmployeeOptionLabel}
                  value={employees.find((option) => option.value === selectedDelivery?.assignedEmployee)}
                  onChange={(selectedOption) =>
                    setSelectedDelivery({ ...selectedDelivery, assignedEmployee: selectedOption?.value })
                  }
                  isSearchable
                  filterOption={(candidate, input) =>
                    candidate.label.toLowerCase().includes(input.toLowerCase()) ||
                    candidate.data.phoneNumber.includes(input)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assigned Routes</label>
                <Select
                  options={routes}
                  value={routes.find((option) => option.value === selectedDelivery?.assignedRoutes)}
                  onChange={(selectedOption) =>
                    setSelectedDelivery({ ...selectedDelivery, assignedRoutes: selectedOption?.value })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCloseModal}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderView;
