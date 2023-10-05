import { FC } from 'react';
import { Paper, Stack, Text, Group, Divider, Button } from '@mantine/core';
import { stripeApi } from 'resources/stripe';
import { useStyles } from './styles';

interface SummaryProps {
  totalPrice: number
  checkoutData: {
    priceId: string,
    productPrice: number,
    pickedQuantity: number,
  }[]
}

const Summary: FC<SummaryProps> = ({ totalPrice, checkoutData }) => {
  const { classes } = useStyles();
  const { mutate: createSession } = stripeApi.useCreateSession();

  const handleSubmit = () => {
    createSession(checkoutData);
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
        <Button onSubmit={handleSubmit} type="submit">Proceed to Checkout</Button>
      </Stack>
    </Paper>
  );
};

export default Summary;
