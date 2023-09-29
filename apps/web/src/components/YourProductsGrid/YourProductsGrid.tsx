import React, { FC } from 'react';
import { Grid, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { Product } from 'types';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { RoutePath } from 'routes';
import YourProductCard from '../YourProductCard/YourProductCard';
import { useStyles } from './styles';

interface ProductsProps {
  products: Product[];
}

const YourProductsGrid : FC<ProductsProps> = ({ products }) => {
  const { classes } = useStyles();

  return (
    <Grid gutter="lg">
      <Grid.Col span={2}>
        <Link href={RoutePath.CreateProduct} className={classes.newProduct}>
          <Paper className={classes.newProduct}>
            <Stack spacing="12px" align="center">
              <ThemeIcon radius="xl" size="40px">
                <IconPlus />
              </ThemeIcon>
              <Text className={classes.newProductText}>
                New Product
              </Text>
            </Stack>
          </Paper>
        </Link>
      </Grid.Col>
      {products.map((product: Product) => (
        <Grid.Col span={2} key={product._id}>
          <YourProductCard
            _id={product._id}
            productName={product.productName}
            productPrice={product.productPrice}
            imageUrl={product.imageUrl}
            soldOut={product.soldOut}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default YourProductsGrid;
