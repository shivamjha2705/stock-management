// // CustomDataTable.tsx

// import React from 'react';
// import { DataTable, DataTableProps } from '@tanstack/react-table';
// import { UserManagement } from '@/constants/user-management-data';
// import { ColumnDef } from '@tanstack/react-table';
// import { ProductManagement } from '@/constants/product-management-data';

// interface CustomDataTableProps extends DataTableProps<ProductManagement, unknown> {
//   onSearch: (searchValue: string) => void;
//   onSort: (sortBy: keyof ProductManagement, sortOrder: 'asc' | 'desc') => void;
// }

// const CustomDataTable: React.FC<CustomDataTableProps> = ({
//   onSearch,
//   onSort,
//   ...restProps
// }) => {
//   return <DataTable {...restProps} />;
// };

// export default CustomDataTable;
