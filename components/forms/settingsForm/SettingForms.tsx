'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
// import { UserManagement, userManagementData } from '@/constants/user-management-data';


export const SettingForm: React.FC = () => {

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`General Settings`}
          description="Manage General Settings"
        />
      </div>
      <Separator />
      
    </>
  );
};
