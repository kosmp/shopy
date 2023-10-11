import { FC, ReactNode } from 'react';
import { ColumnDefTemplate, HeaderContext, HeaderGroup } from '@tanstack/react-table';
import { useStyles } from './styles';

type CellData = {
  [key: string]: string | Function | boolean | Record<string, any>;
};

interface TheadProps {
  headerGroups: HeaderGroup<CellData>[];
  flexRender: (
    template: ColumnDefTemplate<HeaderContext<CellData, any>> | undefined,
    context: HeaderContext<CellData, any>
  ) => ReactNode;
}

const Thead: FC<TheadProps> = ({ headerGroups, flexRender }) => {
  const { classes } = useStyles();

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              className={classes.th}
            >
              {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default Thead;
