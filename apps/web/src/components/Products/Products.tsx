import { FC } from 'react';
import { Grid } from "@mantine/core";
import { Product } from "types";
import Card from "../ProductCard/Card";


interface ProductsProps {
    products: Product[];
}


const Products : FC<ProductsProps> = ({products}) => {
    return (
        <Grid gutter="lg">
            {products.map((product : Product) => (
                <Grid.Col span={4} key={product.id}>
                    <Card
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                </Grid.Col>
            ))}
        </Grid>
    )
}

export default Products;