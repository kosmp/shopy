import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Skeleton, Stack, Tabs, Group } from '@mantine/core';
import { productApi, productTypes } from 'resources/product';
import { accountApi } from 'resources/account';
import { paymentApi } from 'resources/payment';
import { useStyles } from './styles';
import { HistoryColumnsData, CheckOutData } from './types';
import { getHistoryColumns, getMyCartColumns } from './components/CartProductsTable/utils';
import Summary from './components/Summary';
import CartProductsTable from './components/CartProductsTable';
import EmptyStateCard from './components/EmptyStateCard';

const Cart: NextPage = () => {
  const { classes } = useStyles();
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentTabValue, setCurrentTabValue] = useState('my cart');
  const { data: allProducts, isLoading: isListLoading } = productApi.useList({});
  const { data: currentUser } = accountApi.useGet();
  const [myCartData, setMyCartData] = useState<Array<productTypes.Product>>([]);
  const [checkoutData, setCheckoutData] = useState<CheckOutData[]>([]);
  const { data: historyData } = paymentApi.useGetPaymentHistory();
  const [resultHistoryData, setResultHistoryData] = useState<Array<HistoryColumnsData>>([]);

  useEffect(() => {
    setTotalPrice(checkoutData.reduce((result, item) => (result + item.pickedQuantity * item.productPrice), 0));
  }, [checkoutData]);

  useEffect(() => {
    if (currentUser !== undefined && allProducts !== undefined) {
      if (currentTabValue === 'history') {
        const resultArray: HistoryColumnsData[] = historyData?.map((item) => ({
          productName: item.productName,
          productPrice: item.productPrice,
          purchaseDate: item.purchaseDate,
          imageUrl: item.imageUrl,
        })) ?? [];

        setResultHistoryData(resultArray);
      } else {
        setMyCartData(allProducts.items.filter((item) => currentUser.productsInCart?.includes(item._id)));
      }
    }
  }, [currentTabValue, historyData, allProducts, currentUser]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Group spacing={78} grow={((currentTabValue === 'my cart' && !myCartData.length) || (currentTabValue === 'history' && !resultHistoryData.length))}>
        <Stack spacing={20} className={((currentTabValue === 'my cart' && myCartData.length) || (currentTabValue === 'history' && resultHistoryData.length)) ? classes.mainCartBlockStack : ''}>
          <Tabs defaultValue="my cart" variant="pills" activateTabWithKeyboard onTabChange={(value: string) => setCurrentTabValue(value)}>
            <Tabs.List>
              <Tabs.Tab value="my cart" className={`${classes.tab} ${classes.leftTabMargin}`}>
                My cart
              </Tabs.Tab>

              <Tabs.Tab value="history" className={`${classes.tab} ${classes.rightTabMargin}`}>
                History
              </Tabs.Tab>
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

          {(currentTabValue === 'my cart' && myCartData.length) || (currentTabValue === 'history' && resultHistoryData.length) ? (
            <CartProductsTable
              columns={currentTabValue === 'my cart' ? getMyCartColumns(classes, checkoutData, setCheckoutData) : getHistoryColumns(classes)}
              data={currentTabValue === 'my cart' ? myCartData : resultHistoryData}
            />
          ) : (
            <Group grow>
              <EmptyStateCard />
            </Group>
          )}
        </Stack>

        {currentTabValue === 'my cart' && myCartData.length > 0 && <Summary totalPrice={totalPrice} checkoutData={checkoutData} />}
      </Group>
    </>
  );
};

export default Cart;
