import { FC } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import { Paper } from '@mantine/core';
import { Table as TableContainer } from '@mantine/core/lib/Table/Table';
import Thead from './thead';
import Tbody from './tbody';

type SpacingSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface TableProps {
  data: RowData[];
  columns: ColumnDef<any>[];
  horizontalSpacing?: SpacingSizes;
  verticalSpacing?: SpacingSizes;
}

const CartProductsTable: FC<TableProps> = ({
  data,
  columns,
  horizontalSpacing = 'xl',
  verticalSpacing = 'lg',
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Paper radius="sm" withBorder>
      <TableContainer
        horizontalSpacing={horizontalSpacing}
        verticalSpacing={verticalSpacing}
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
    </Paper>
  );
};

export default CartProductsTable;
