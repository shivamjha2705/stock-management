// components/AssignedRoutesCell.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import EditRoutesModal from '@/components/EditRoutesModal';

interface AssignedRoutesCellProps {
  routes: string[];
  onSave: (newRoutes: string[]) => void;
}

const AssignedRoutesCell: React.FC<AssignedRoutesCellProps> = ({ routes: initialRoutes, onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routes, setRoutes] = useState(initialRoutes);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveRoutes = (newRoutes: string[]) => {
    setRoutes(newRoutes);
    onSave(newRoutes);
    closeModal();
  };

  return (
    <div className='flex' >
      <ul className="list-disc pl-4">
        {routes.map((route, index) => (
          <li key={index} className="my-1">{route}</li>
        ))}
      </ul>
      {/* <Button onClick={openModal} className="mt-2 flex items-center">
        <Edit className="mr-2" size={16} /> Edit Routes
      </Button> */}
              <Edit onClick={openModal}  className="mr-2 ms-2 text-red-500" size={16} /> 

      <EditRoutesModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        routes={routes} 
        onSave={saveRoutes} 
      />
    </div>
  );
};

export default AssignedRoutesCell;
