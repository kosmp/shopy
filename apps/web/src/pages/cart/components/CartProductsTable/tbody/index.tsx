import { FC, ReactNode } from 'react';
import { CellContext, ColumnDefTemplate, Row } from '@tanstack/react-table';
import { useStyles } from './styles';

type RowData = {
  [key: string]: string | number | boolean | Record<string, any>;
};

interface TbodyProps {
  rows: Row<RowData>[];
  flexRender: (
    template: ColumnDefTemplate<CellContext<RowData, any>> | undefined,
    context: CellContext<RowData, any>
  ) => ReactNode;
}

const Tbody: FC<TbodyProps> = ({ rows, flexRender }) => {
  const { classes } = useStyles();

  return (
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className={classes.cell}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
