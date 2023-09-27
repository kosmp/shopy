import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { Grid } from '@mantine/core';
import Summary from './components/Summary';
import MainCartBlock from './components/MainCartBlock';

const Cart: NextPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>
      <Grid>
        <Grid.Col span={9}>
          <MainCartBlock />
        </Grid.Col>
        <Grid.Col span={3}>
          <Summary totalPrice={totalPrice} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Cart;
