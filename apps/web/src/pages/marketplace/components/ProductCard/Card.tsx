import {
  Paper,
  Image,
  Stack,
  Text,
  Button, Group,
} from '@mantine/core';
import { FC } from 'react';
import { Product } from 'types';
import { accountApi } from 'resources/account';
import { handleError } from 'utils';
import { useStyles } from './styles';

const Card : FC<Product> = ({ _id, imageUrl, productName, productPrice }) => {
  const { classes } = useStyles();
  const { mutate: addToCart } = accountApi.useAddProductToCart();

  const handleAddToCart = () => {
    addToCart({ productId: _id }, {
      onError: (err) => handleError(err),
    });
  };

  return (
    <Paper>
      <Stack>
        <Image src={imageUrl} height={218} fit="cover" />

        <Stack className={classes.namePriceButtonStack}>
          <Stack spacing="13.51px">
            <Text fz="20px" fw={700}>
              {productName}
            </Text>

            <Group position="apart">
              <Text color="#A3A3A3">
                Price:
              </Text>

              <Text fz="20px" fw={700}>
                $
                {productPrice}
              </Text>
            </Group>
          </Stack>

          <Button onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Card;
