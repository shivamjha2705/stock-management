// components/EditRoutesModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EditRoutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  routes: string[];
  onSave: (routes: string[]) => void;
}

const EditRoutesModal: React.FC<EditRoutesModalProps> = ({ isOpen, onClose, routes, onSave }) => {
  const [routesList, setRoutesList] = useState(routes);

  const handleRouteChange = (index: number, newValue: string) => {
    const newRoutes = [...routesList];
    newRoutes[index] = newValue;
    setRoutesList(newRoutes);
  };

  const saveChanges = () => {
    onSave(routesList);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Routes</DialogTitle>
          <DialogDescription>Manage the routes assigned to the user.</DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <ul className="list-disc pl-4">
            {routesList.map((route, index) => (
              <li key={index} className="flex justify-between items-center my-1">
                <Input
                  type="text"
                  value={route}
                  onChange={(e) => handleRouteChange(index, e.target.value)}
                  placeholder={`Route ${index + 1}`}
                  className="flex-1"
                />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <Button onClick={saveChanges}>Save</Button>
            <Button onClick={onClose} variant="outline" className="ml-2">Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoutesModal;
