import { NextPage } from 'next';
import { Stack, Text } from '@mantine/core';
import { productApi } from 'resources/product';
import Head from 'next/head';
import React from 'react';
import { YourProductsGrid } from './components';
import { useStyles } from './styles';

const YourProducts: NextPage = () => {
  const { classes } = useStyles();
  const { data } = productApi.useList({ showYourProducts: true, showNotSoldOut: false });

  return (
    <>
      <Head>
        <title>Your-products</title>
      </Head>

      <Stack spacing={20}>
        <Text className={classes.text}>
          Your Products
        </Text>

        <YourProductsGrid products={data?.items ?? []} />
      </Stack>
    </>
  );
};

export default YourProducts;
