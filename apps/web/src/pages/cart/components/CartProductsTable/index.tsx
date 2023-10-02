import { FC } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import { Table as TableContainer } from '@mantine/core';
import Thead from './thead';
import Tbody from './tbody';

interface TableProps {
  data: RowData[];
  columns: ColumnDef<any>[];
}

const CartProductsTable: FC<TableProps> = ({
  data,
  columns,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer
      withBorder={false}
      style={{ padding: 0 }}
    >
      <Thead
        headerGroups={table.getHeaderGroups()}
        flexRender={flexRender}
      />
      <Tbody
        rows={table.getRowModel().rows}
        flexRender={flexRender}
      />
    </TableContainer>
  );
};

export default CartProductsTable;
