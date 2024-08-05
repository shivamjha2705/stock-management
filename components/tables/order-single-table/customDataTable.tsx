// // CustomDataTable.tsx

// import React from 'react';
// import { DataTable, DataTableProps } from '@tanstack/react-table';
// import { OrderManagement } from '@/constants/order-management-data';

// interface CustomDataTableProps extends DataTableProps<OrderManagement, unknown> {
//   onSearch: (searchValue: string) => void;
//   onSort: (sortBy: keyof OrderManagement, sortOrder: 'asc' | 'desc') => void;
// }

// const CustomDataTable: React.FC<CustomDataTableProps> = ({
//   onSearch,
//   onSort,
//   ...restProps
// }) => {
//   return <DataTable {...restProps} />;
// };

// export default CustomDataTable;
