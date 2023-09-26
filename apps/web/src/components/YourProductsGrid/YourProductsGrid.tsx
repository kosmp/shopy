import React, { FC } from 'react';
import { Grid, Paper, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { Product } from 'types';
import { IconPlus } from '@tabler/icons-react';
import YourProductCard from '../YourProductCard/YourProductCard';
import { useStyles } from './styles';

interface ProductsProps {
  products: Product[];
}

const handleNewProductButton = () => {

};

const YourProductsGrid : FC<ProductsProps> = ({ products }) => {
  const { classes } = useStyles();

  return (
    <Grid gutter="lg">
      <Grid.Col span={2}>
        <UnstyledButton className={classes.newProduct} onClick={handleNewProductButton}>
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
        </UnstyledButton>
      </Grid.Col>
      {products.map((product: Product) => (
        <Grid.Col span={2} key={product.id}>
          <YourProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            sold={product.sold}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default YourProductsGrid;
