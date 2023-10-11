import { FC } from 'react';
import { Grid } from '@mantine/core';
import { Product } from 'types';
import Card from '../ProductCard/Card';

interface ProductsProps {
  data: Product[];
  currentPage: number;
  itemsPerPage: number;
}

const Products : FC<ProductsProps> = ({ data, currentPage, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleProducts = data.slice(startIndex, endIndex);

  return (
    <Grid gutter="lg">
      {visibleProducts.map((product: Product) => (
        <Grid.Col span={4} key={product._id}>
          <Card
            _id={product._id}
            productName={product.productName}
            productPrice={product.productPrice}
            priceId={product.priceId}
            imageUrl={product.imageUrl}
            soldOut={product.soldOut}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default Products;
