import { NextPage } from 'next';
import { Stack, Text } from '@mantine/core';
import { YourProductsGrid } from 'components';
import { productApi } from 'resources/product';
import { useStyles } from './styles';

const YourProducts: NextPage = () => {
  const { classes } = useStyles();
  const { data } = productApi.useList({ showYourProducts: 'true', showNotSoldOut: 'false' });

  return (
    <Stack spacing="20px">
      <Text className={classes.text}>
        Your Products
      </Text>
      <YourProductsGrid products={data?.items ?? []} />
    </Stack>
  );
};

export default YourProducts;
