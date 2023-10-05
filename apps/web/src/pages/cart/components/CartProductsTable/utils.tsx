import { ColumnDef } from '@tanstack/react-table';
import { Group, Image, Text } from '@mantine/core';
import React from 'react';
import { productTypes } from 'resources/product';
import { HistoryColumnsData } from '../../types';
import QuantityCell from '../QuantityCell';
import RemoveButton from '../RemoveButton';

export const getHistoryColumns = (styles: Record<string, string>) => {
  const historyColumns: ColumnDef<HistoryColumnsData>[] = [
    {
      accessorKey: 'imageAndProductName',
      header: (
        () => (
          <Text align="left" className={styles.headersText}>
            Item
          </Text>
        )
      ),
      cell: (info) => (
        <Group spacing="25px" className={styles.firstColumnHistory}>
          <Image
            width="80"
            height="80"
            radius="8px"
            src={info.row.original.imageUrl}
            alt={info.row.original.productName}
          />
          <Text size="16px" fw={700}>
            {info.row.original.productName}
          </Text>
        </Group>
      ),
    },
    {
      accessorKey: 'productPrice',
      header: (
        () => (
          <Text align="right" className={styles.headersText}>
            Unit Price
          </Text>
        )
      ),
      cell: (info) => (
        <Text className={styles.otherColumns}>
          $
          {info.row.original.productPrice}
        </Text>
      ),
    },
    {
      accessorKey: 'purchaseDate',
      header: (
        () => (
          <Text align="right" className={styles.headersText}>
            Date
          </Text>
        )
      ),
      cell: (info) => (
        <Text className={styles.otherColumns}>
          {info.row.original.purchaseDate?.toDateString()}
        </Text>
      ),
    },
  ];

  return historyColumns;
};

export const getMyCartColumns = (
  styles: Record<string, string>,
) => {
  const myCartColumns: ColumnDef<productTypes.Product>[] = [
    {
      accessorKey: 'imageAndProductName',
      header: (
        () => (
          <Text align="left" className={styles.headersText}>
            Item
          </Text>
        )
      ),
      cell: (info) => (
        <Group spacing="25px" className={styles.firstColumn}>
          <Image
            width="80"
            height="80"
            radius="8px"
            src={info.row.original.imageUrl}
            alt={info.row.original.productName}
          />
          <Text size="16px" fw={700}>
            {info.row.original.productName}
          </Text>
        </Group>
      ),
    },
    {
      accessorKey: 'productPrice',
      header: (
        () => (
          <Text align="right" className={styles.headersText}>
            Unit Price
          </Text>
        )
      ),
      cell: (info) => (
        <Text className={styles.otherColumns}>
          $
          {info.row.original.productPrice}
        </Text>
      ),
    },
    {
      accessorKey: 'pickedQuantity',
      header: (
        () => (
          <Text align="right" className={styles.headersText}>
            Quantity
          </Text>
        )
      ),
      cell: (info) => (
        <QuantityCell
          productId={info.row.original._id}
          priceId={info.row.original.priceId}
          productPrice={info.row.original.productPrice}
          maxValue={info.row.original.productCount}
        />
      ),
    },
    {
      accessorKey: 'removeButton',
      header: '',
      cell: (info) => <RemoveButton productId={info.row.original._id} />,
    },
  ];

  return myCartColumns;
};
