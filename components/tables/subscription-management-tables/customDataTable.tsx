// // CustomDataTable.tsx

// import React from 'react';
// import { DataTable, DataTableProps } from '@tanstack/react-table';
// import { UserManagement } from '@/constants/user-management-data';
// import { ColumnDef } from '@tanstack/react-table';
// import { SubscriptionManagement } from '@/constants/subscription-management-data';

// interface CustomDataTableProps extends DataTableProps<SubscriptionManagement, unknown> {
//   onSearch: (searchValue: string) => void;
//   onSort: (sortBy: keyof SubscriptionManagement, sortOrder: 'asc' | 'desc') => void;
// }

// const CustomDataTable: React.FC<CustomDataTableProps> = ({
//   onSearch,
//   onSort,
//   ...restProps
// }) => {
//   return <DataTable {...restProps} />;
// };

// export default CustomDataTable;
