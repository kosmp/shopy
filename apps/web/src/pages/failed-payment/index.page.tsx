import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Group } from '@mantine/core';
import { PaymentResultCard } from 'components';
import { useStyles } from './styles';

const FailedPayment: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Payment Failed</title>
      </Head>
      <Group position="center" className={classes.group}>
        <PaymentResultCard
          paymentStatusText="Payment Failed"
          description="Sorry, your payment failed.
Would you like to try again?"
          imagePath="images/cross-mark.png"
        />
      </Group>
    </>
  );
};

export default FailedPayment;
