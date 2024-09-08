// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { DataTable } from '@/components/ui/data-table';
// import { Heading } from '@/components/ui/heading';
// import { Separator } from '@/components/ui/separator';
// // import { UserManagement, userManagementData } from '@/constants/user-management-data';

// import { Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { columns } from './columns';
// import { SubscriptionManagement, SubscriptionManagementData } from '@/constants/subscription-management-data';
// import { ProductManagement, ProductManagementData } from '@/constants/product-management-data';

// export const ProductManagementClient: React.FC = () => {
//   const router = useRouter();
//   const initialData: ProductManagement[] = ProductManagementData;
//   const [data, setData] = useState<ProductManagement[]>(initialData);

//   const handleSearch = (searchValue: string) => {
//     const filteredData = initialData.filter(item =>
//       item.product_name.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setData(filteredData);
//   };

//   const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
//     // Example: Sorting by first name
//     const sortedData = [...data].sort((a, b) => {
//       if (sortOrder === 'asc') {
//         return a..localeCompare(b.);
//       } else {
//         return b..localeCompare(a.);
//       }
//     });
//     setData(sortedData);
//   };
//   const filters = [
//     {
//       label: 'Season ',
//       subOptions: ['Winter', 'Autumn',],
//     },
//     {
//       label: 'Priority',
//       subOptions: ['High', 'Medium', 'Low'],
//     },
  
//   ];

//   return (
//     <>
//       <div className="flex items-start justify-between">
//         <Heading
//           title={`Items (${data.length})`}
//           description="Manage Items (Client side table functionalities.)"
//         />
//         <Button
//           className="text-xs md:text-sm"
//           onClick={() => router.push(`/product`)}
//         >
//           <Plus className="mr-2 h-4 w-4" /> Add New
//         </Button>
//       </div>
//       <Separator />
//       <DataTable
//         searchKey=""
//         columns={columns}
//         data={data}
//         onSearch={handleSearch} 
//         filters={filters}

//         // onSort={handleSort} 
//       />
//     </>
//   );
// };


'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { ProductManagement } from '@/constants/product-management-data';
import apiCall from '@/lib/axios';

export const ProductManagementClient: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<ProductManagement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchProducts() {
    try {
      const response:any = await apiCall('get', '/products/');
      console.log(response);
      // Adjust the URL to match your API endpoint
      setData(response)
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  }

  useEffect(() => {
    
     fetchProducts();

    
},[]);

  const handleSearch = (searchValue: string) => {
    const filteredData = data.filter(item =>
      item.product_name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  // const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
  //   const sortedData = [...data].sort((a, b) => {
  //     if (sortOrder === 'asc') {
  //       return a[sortBy].localeCompare(b[sortBy]);
  //     } else {
  //       return b[sortBy].localeCompare(a[sortBy]);
  //     }
  //   });
  //   setData(sortedData);
  // };

  const handleSort = (sortBy: keyof ProductManagement, sortOrder: 'asc' | 'desc') => {
    const sortedData = [...data].sort((a, b) => {
      if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
        // For string values
        if (sortOrder === 'asc') {
          return a[sortBy].localeCompare(b[sortBy]);
        } else {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      } else if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
        // For numeric values
        if (sortOrder === 'asc') {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      }
      return 0; // Default return for unmatched types
    });
    setData(sortedData);
  };
  

  const filters = [
    {
      label: 'Category',
      subOptions: ['Category1', 'Category2'], // Replace with actual categories if known
    },
    // Add more filters as needed
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Items (${data.length})`}
          description="Manage Items (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/product`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="product_name"
        columns={columns}
        data={data}
        onSearch={handleSearch}
        filters={filters}
      />
    </>
  );
};

