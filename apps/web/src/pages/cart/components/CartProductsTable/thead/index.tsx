import { FC, ReactNode } from 'react';
import { ColumnDefTemplate, HeaderContext, HeaderGroup } from '@tanstack/react-table';

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

const Thead: FC<TheadProps> = ({ headerGroups, flexRender }) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th
            key={header.id}
            colSpan={header.colSpan}
            style={{
              width: 'auto',
            }}
          >
            {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export default Thead;
