import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Container, Group, Skeleton, Image, Stack, Tabs, Text } from '@mantine/core';
import { productApi, productTypes } from 'resources/product';
import { accountApi } from 'resources/account';
import { ColumnDef } from '@tanstack/react-table';
import { useStyles } from './styles';
import Summary from './components/Summary';
import CartProductsTable from './components/CartProductsTable';
import QuantityCell from './components/QuantityCell';
import RemoveButton from './components/RemoveButton';

interface HistoryData {
  productName: string,
  productPrice: number,
  purchaseDate: Date,
  imageUrl: string,
}

const myCartColumns: ColumnDef<productTypes.Product>[] = [
  {
    accessorKey: 'imageAndProductName',
    header: 'Item',
    cell: (info) => (
      <Group spacing="25px">
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
    header: 'Unit Price',
    cell: (info) => (
      <Text>
        $
        {info.row.original.productPrice}
      </Text>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: (info) => <QuantityCell maxValue={info.row.original.productCount} />,
  },
  {
    accessorKey: 'removeButton',
    header: '',
    cell: (info) => <RemoveButton productId={info.row.original._id} />,
  },
];

const historyColumns: ColumnDef<HistoryData>[] = [
  {
    accessorKey: 'imageAndProductName',
    header: 'Item',
    cell: (info) => (
      <Group spacing="25px">
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
    header: 'Unit Price',
    cell: (info) => (
      <Text>
        $
        {info.row.original.productPrice}
      </Text>
    ),
  },
  {
    accessorKey: '',
    header: 'Date',
    cell: (info) => (
      <Text>
        {info.row.original.purchaseDate?.toDateString()}
      </Text>
    ),
  },
];

const Cart: NextPage = () => {
  const { classes } = useStyles();
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentTabValue, setCurrentTabValue] = useState('my cart');
  const { data: allProducts, isLoading: isListLoading } = productApi.useList({});
  const { data: currentUser } = accountApi.useGet();
  const [data, setData] = useState<Array<HistoryData | productTypes.Product>>([]);

  useEffect(() => {
    if (currentUser !== undefined && allProducts !== undefined) {
      if (currentTabValue === 'history') {
        const purchasedProductsByUser: HistoryData[] = currentUser.purchasedProducts.reduce(
          (result: Array<HistoryData>, item) => {
            result.push({
              purchaseDate: item.purchaseDate,
              productName: item.productName,
              productPrice: item.productPrice,
              imageUrl: item.imageUrl,
            });

            return result;
          },
          [],
        );
        setData(purchasedProductsByUser ?? []);
      } else {
        setData(allProducts.items.filter((item) => currentUser.productsInCart?.includes(item._id)));
      }
    }
  }, [currentTabValue, allProducts, currentUser]);

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>
      <Group spacing="78px">
        <Stack spacing="20px" className={classes.mainCartBlockStack}>
          <Tabs defaultValue="my cart" variant="pills" activateTabWithKeyboard onTabChange={(value: string) => setCurrentTabValue(value)}>
            <Tabs.List>
              <Tabs.Tab value="my cart" className={`${classes.tab} ${classes.leftTabMargin}`}>My cart</Tabs.Tab>
              <Tabs.Tab value="history" className={`${classes.tab} ${classes.rightTabMargin}`}>History</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          {isListLoading && (
          <>
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={`sklton-${String(item)}`}
                height={50}
                radius="sm"
                mb="sm"
              />
            ))}
          </>
          )}
          {data.length ? (
            <CartProductsTable
              columns={currentTabValue === 'my cart' ? myCartColumns : historyColumns}
              data={data}
            />
          ) : (
            <Container p={75}>
              <Text size="xl" color="grey">
                No results found, try to adjust your search.
              </Text>
            </Container>
          )}
        </Stack>
        {currentTabValue === 'my cart' && <Summary totalPrice={totalPrice} />}
      </Group>
    </>
  );
};

export default Cart;
