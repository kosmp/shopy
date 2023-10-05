import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Container, Skeleton, Stack, Flex, Tabs, Text, Group } from '@mantine/core';
import { productApi, productTypes } from 'resources/product';
import { accountApi } from 'resources/account';
import { useLocalStorage } from '@mantine/hooks';
import { HistoryColumnsData } from './types';
import { useStyles } from './styles';
import { getHistoryColumns, getMyCartColumns } from './components/CartProductsTable/utils';
import Summary from './components/Summary';
import CartProductsTable from './components/CartProductsTable';

interface CheckOutData {
  priceId: string,
  productPrice: number,
  pickedQuantity: number,
  removed?: boolean
}

const Cart: NextPage = () => {
  const { classes } = useStyles();
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentTabValue, setCurrentTabValue] = useState('my cart');
  const { data: allProducts, isLoading: isListLoading } = productApi.useList({});
  const { data: currentUser } = accountApi.useGet();
  const [data, setData] = useState<Array<HistoryColumnsData | productTypes.Product>>([]);
  const [checkoutData, setCheckoutData] = useLocalStorage<CheckOutData[]>({ key: 'checkout_data', defaultValue: [], getInitialValueInEffect: false });

  useEffect(() => {
    setTotalPrice(checkoutData.reduce((result, item) => (result + item.pickedQuantity * item.productPrice), 0));
  }, [checkoutData]);

  useEffect(() => {
    if (currentUser !== undefined && allProducts !== undefined) {
      if (currentTabValue === 'history') {
        const purchasedProductsByUser: HistoryColumnsData[] = currentUser.purchasedProducts.reduce(
          (result: Array<HistoryColumnsData>, item) => {
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
      <Group>
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
              columns={currentTabValue === 'my cart' ? getMyCartColumns(classes) : getHistoryColumns(classes)}
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
        {currentTabValue === 'my cart' && <Summary totalPrice={totalPrice} checkoutData={checkoutData} />}
      </Group>
    </>
  );
};

export default Cart;
