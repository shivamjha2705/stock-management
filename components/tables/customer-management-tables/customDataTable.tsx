// // CustomDataTable.tsx

// import React from 'react';
// import { DataTable, DataTableProps } from '@tanstack/react-table';
// import { EmployeeManagement } from '@/constants/employee-management-data';


// interface CustomDataTableProps extends DataTableProps<EmployeeManagement, unknown> {
//   onSearch: (searchValue: string) => void;
//   onSort: (sortBy: keyof EmployeeManagement, sortOrder: 'asc' | 'desc') => void;
// }

// const CustomDataTable: React.FC<CustomDataTableProps> = ({
//   onSearch,
//   onSort,
//   ...restProps
// }) => {
//   return <DataTable {...restProps} />;
// };

// export default CustomDataTable;
