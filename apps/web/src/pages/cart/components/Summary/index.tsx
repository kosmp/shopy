import { FC, useState } from 'react';
import { Paper, Stack, Text, Group, Divider, Button } from '@mantine/core';
import { checkoutApi } from 'resources/checkout';
import { useStyles } from './styles';

interface SummaryProps {
  totalPrice: number
  checkoutData: {
    priceId: string,
    productPrice: number,
    pickedQuantity: number,
    removed?: boolean
  }[]
}

const Summary: FC<SummaryProps> = ({ totalPrice, checkoutData }) => {
  const { classes } = useStyles();
  const { mutate: createSession } = checkoutApi.useCreateSession();
  const [loading, setLoading] = useState<boolean>(false);

  const handleProceed = () => {
    setLoading(true);

    const updatedCheckoutData : {
      price: string;
      quantity: number;
    }[] = checkoutData.map((item) => {
      const { productPrice, removed, ...rest } = item;
      return {
        price: rest.priceId,
        quantity: rest.pickedQuantity,
      };
    });

    new Promise(() => { createSession(updatedCheckoutData); }).then(() => setLoading(false));
  };

  return (
    <Paper className={classes.summaryCard}>
      <Stack spacing="32px">
        <Text className={classes.summaryTitleText}>Summary</Text>
        <Divider />
        <Group position="apart">
          <Text className={classes.totalPriceTitle}>Total price</Text>
          <Text>
            $
            {totalPrice}
          </Text>
        </Group>
        <Button onClick={handleProceed} loading={loading}>Proceed to Checkout</Button>
      </Stack>
    </Paper>
  );
};

export default Summary;
