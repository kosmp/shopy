import { NextPage } from 'next';
import { Stack, Text } from '@mantine/core';
import { YourProductsGrid } from 'components';
import { Product } from 'types';
import { useStyles } from './styles';

const products : Product[] = [
  { id: 1, name: 'Product 1', price: 24, image: 'images/test-image1.png', sold: false },
  { id: 2, name: 'Product 2', price: 654, image: 'images/test-image2.png', sold: true },
];

const YourProducts: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Stack spacing="20px">
      <Text className={classes.text}>
        Your Products
      </Text>
      <YourProductsGrid products={products} />
    </Stack>
  );
};

export default YourProducts;
