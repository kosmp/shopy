import { ColumnDef } from '@tanstack/react-table';
import { Group, Image, Text } from '@mantine/core';
import React, { Dispatch, SetStateAction } from 'react';
import { productTypes } from 'resources/product';
import { CheckOutData, HistoryColumnsData } from '../../types';
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
            radius={8}
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
          {new Date(info.row.original.purchaseDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </Text>
      ),
    },
  ];

  return historyColumns;
};

export const getMyCartColumns = (
  styles: Record<string, string>,
  checkOutData: CheckOutData[],
  setCheckoutData: Dispatch<SetStateAction<CheckOutData[]>>,
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
        <Group spacing="25px" className={styles.firstColumnMyCart}>
          <Image
            width="80"
            height="80"
            radius={8}
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
          priceId={info.row.original.priceId}
          productPrice={info.row.original.productPrice}
          maxValue={info.row.original.productCount}
          checkOutData={checkOutData}
          setCheckoutData={setCheckoutData}
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
