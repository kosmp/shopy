import React, { FC } from 'react';
import Link from 'next/link';
import { Button, Paper, Stack, Text, Image } from '@mantine/core';
import { useStyles } from './styles';

interface PaymentResultCardProps {
  paymentStatusText: string,
  description: string,
  imagePath: string,
}

const PaymentResultCard : FC<PaymentResultCardProps> = ({ paymentStatusText, description, imagePath }) => {
  const { classes } = useStyles();

  return (
    <Paper p="20px" className={classes.card}>
      <Stack spacing="32px" align="center">
        <Image maw={56} src={imagePath} />

        <Stack spacing="16px" align="center">
          <Text fw={600} fz="24px">
            {paymentStatusText}
          </Text>

          <Text color="#767676">
            {description}
          </Text>
        </Stack>

        <Link href="/cart">
          <Button>
            Back to Cart
          </Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default PaymentResultCard;
