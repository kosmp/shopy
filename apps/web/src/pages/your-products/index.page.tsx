import { NextPage } from 'next';
import { Stack, Text } from '@mantine/core';
import { YourProductsGrid } from 'components';
import { Product } from 'types';
import { useStyles } from './styles';

const products : Product[] = [
  { _id: '1', productName: 'Product 1', productPrice: 24, imageUrl: 'images/test-image1.png', soldOut: false },
  { _id: '2', productName: 'Product 2', productPrice: 654, imageUrl: 'images/test-image2.png', soldOut: true },
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
