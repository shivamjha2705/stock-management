'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import { Trash, Trash2Icon } from 'lucide-react';

const initialData = [
  { id: uuidv4(), city: 'City A', routes: ['Route 1', 'Route 2', 'Route 3'] },
  { id: uuidv4(), city: 'City B', routes: ['Route 4', 'Route 5', 'Route 6'] },
  { id: uuidv4(), city: 'City C', routes: ['Route 7', 'Route 8', 'Route 9'] },
];

export const RoutesForm: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [newCity, setNewCity] = useState('');
  const [newRoutes, setNewRoutes] = useState<{ [key: string]: string }>({});

  const handleAddCity = () => {
    if (newCity.trim()) {
      setData([...data, { id: uuidv4(), city: newCity.trim(), routes: [] }]);
      setNewCity('');
    }
  };

  const handleAddRoute = (cityId: string) => {
    if (newRoutes[cityId]?.trim()) {
      setData(data.map(city =>
        city.id === cityId
          ? { ...city, routes: [...city.routes, newRoutes[cityId].trim()] }
          : city
      ));
      setNewRoutes({ ...newRoutes, [cityId]: '' });
    }
  };

  const handleDeleteCity = (cityId: string) => {
    setData(data.filter(city => city.id !== cityId));
  };

  const handleDeleteRoute = (cityId: string, route: string) => {
    setData(data.map(city =>
      city.id === cityId
        ? { ...city, routes: city.routes.filter(r => r !== route) }
        : city
    ));
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title="Routes Settings"
          description="Manage Routes Settings"
        />
      </div>
      <Separator />
      <div className="my-4 flex justify-between px-3">
        <Input
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Add new city"
          className="mr-2"
        />
        <Button className='min-w-32' onClick={handleAddCity}>Add City</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-green-200">
            <tr>
              <th className="px-4 py-2 border text-left">City</th>
              <th className="px-4 py-2 border text-left">Routes</th>
              <th className="px-4 py-2 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((city, index) => (
              <tr key={city.id} className={index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'}>
                <td className="px-4 py-2 border">
                  <div className="flex justify-between items-center">
                    {city.city}
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteCity(city.id)}>Delete City</Button>
                  </div>
                </td>
                <td className="px-4 py-2 border">
                  <ul>
                    {city.routes.map(route => (
                      <li key={route} className="flex justify-between items-center py-1">
                        {route}
                        <Trash2Icon className='text-red-500' onClick={() => handleDeleteRoute(city.id, route)}>Delete</Trash2Icon>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 border">
                  <div className='flex flex-col space-y-2'>
                    <Input
                      value={newRoutes[city.id] || ''}
                      onChange={(e) => setNewRoutes({ ...newRoutes, [city.id]: e.target.value })}
                      placeholder={`Add new route to ${city.city}`}
                      className="mr-2"
                    />
                    <Button className='min-w-32' onClick={() => handleAddRoute(city.id)} disabled={!newRoutes[city.id]}>Add Route</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
