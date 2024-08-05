// // CustomDataTable.tsx

// import React from 'react';
// import { DataTable, DataTableProps } from '@tanstack/react-table';

// import { ComplaintManagement } from '@/constants/complaint-management-data';

// interface CustomDataTableProps extends DataTableProps<ComplaintManagement, unknown> {
//   onSearch: (searchValue: string) => void;
//   onSort: (sortBy: keyof ComplaintManagement, sortOrder: 'asc' | 'desc') => void;
// }

// const CustomDataTable: React.FC<CustomDataTableProps> = ({
//   onSearch,
//   onSort,
//   ...restProps
// }) => {
//   return <DataTable {...restProps} />;
// };

// export default CustomDataTable;
