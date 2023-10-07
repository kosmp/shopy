import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { PaymentResultCard } from 'components';
import { Group } from '@mantine/core';
import { useStyles } from '../failed-payment/styles';

const SuccessfullPayment: NextPage = () => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>Payment Successfull</title>
      </Head>
      <Group position="center" className={classes.group}>
        <PaymentResultCard
          paymentStatusText="Payment Successfull"
          description="Hooray, you have completed your payment!"
          imagePath="images/party-popper.png"
        />
      </Group>
    </>
  );
};

export default SuccessfullPayment;
