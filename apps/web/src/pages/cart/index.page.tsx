import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Skeleton, Stack, Tabs, Group } from '@mantine/core';
import { productApi, productTypes } from 'resources/product';
import { accountApi } from 'resources/account';
import { useLocalStorage } from '@mantine/hooks';
import { HistoryColumnsData } from './types';
import { useStyles } from './styles';
import { getHistoryColumns, getMyCartColumns } from './components/CartProductsTable/utils';
import Summary from './components/Summary';
import CartProductsTable from './components/CartProductsTable';
import { paymentApi } from '../../resources/payment';
import EmptyStateCard from './components/EmptyStateCard';

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
  const [myCartData, setMyCartData] = useState<Array<productTypes.Product>>([]);
  const [checkoutData] = useLocalStorage<CheckOutData[]>({ key: 'checkout_data', defaultValue: [], getInitialValueInEffect: false });
  const { data: historyData } = paymentApi.useGetPaymentHistory();
  const [resultHistoryData, setResultHistoryData] = useState<Array<HistoryColumnsData>>([]);

  const handleHistoryData = (): HistoryColumnsData[] => {
    const result: HistoryColumnsData[] = [];

    if (historyData) {
      historyData?.forEach((historyItem) => {
        historyItem?.productList.forEach((productListItem) => {
          const matchingProduct = allProducts?.items.find((product) => product.priceId === productListItem.priceId);

          if (matchingProduct) {
            result.push({
              imageUrl: matchingProduct.imageUrl,
              productName: matchingProduct.productName,
              productPrice: matchingProduct.productPrice,
              purchaseDate: historyItem.createdDate,
            });
          }
        });
      });
    }

    return result;
  };

  useEffect(() => {
    setTotalPrice(checkoutData.reduce((result, item) => (result + item.pickedQuantity * item.productPrice), 0));
  }, [checkoutData]);

  useEffect(() => {
    if (currentUser !== undefined && allProducts !== undefined) {
      if (currentTabValue === 'history') {
        setResultHistoryData(handleHistoryData());
      } else {
        setMyCartData(allProducts.items.filter((item) => currentUser.productsInCart?.includes(item._id)));
      }
    }
  }, [currentTabValue, historyData, allProducts, currentUser]);

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>
      <Group spacing="78px" grow={((currentTabValue === 'my cart' && !myCartData.length) || (currentTabValue === 'history' && !resultHistoryData.length))}>
        <Stack spacing="20px" className={((currentTabValue === 'my cart' && myCartData.length) || (currentTabValue === 'history' && resultHistoryData.length)) ? classes.mainCartBlockStack : ''}>
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
          {(currentTabValue === 'my cart' && myCartData.length) || (currentTabValue === 'history' && resultHistoryData.length) ? (
            <CartProductsTable
              columns={currentTabValue === 'my cart' ? getMyCartColumns(classes) : getHistoryColumns(classes)}
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
