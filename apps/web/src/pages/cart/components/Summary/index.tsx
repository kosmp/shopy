import { FC } from 'react';
import { Paper, Stack, Text, Group, Divider, Button } from '@mantine/core';
import { useStyles } from './styles';

interface SummaryProps {
  totalPrice: number
}

const Summary: FC<SummaryProps> = ({ totalPrice }) => {
  const { classes } = useStyles();

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
        <Button>Proceed to Checkout</Button>
      </Stack>
    </Paper>
  );
};

export default Summary;
