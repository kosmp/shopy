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
import { useLocalStorage } from '@mantine/hooks';
import { useStyles } from './styles';

const Card : FC<Product> = ({ _id, imageUrl, productName, productPrice, soldOut, priceId }) => {
  const { classes } = useStyles();
  const { mutate: addToCart } = accountApi.useAddProductToCart();
  const [checkoutData, setCheckoutData] = useLocalStorage<{ productId: string, priceId: string, pickedQuantity: number, productPrice: number }[]>({ key: 'checkout_data', defaultValue: [], getInitialValueInEffect: false });

  const handleAddToCart = () => {
    addToCart({ productId: _id }, {
      onError: (err) => handleError(err),
    });

    const foundIndex = checkoutData.findIndex((cartProduct: any) => cartProduct.productId === _id);
    if (foundIndex === -1) {
      setCheckoutData([...checkoutData, { productId: _id, priceId, pickedQuantity: 1, productPrice }]);
    }
  };

  return (
    <Paper>
      <Stack>
        <Image src={imageUrl} />
        <Stack className={classes.namePriceButtonStack}>
          <Stack spacing="13.51px">
            <Text className={classes.text}>{productName}</Text>
            <Group position="apart">
              <Text className={classes.priceTitleText}>Price:</Text>
              <Text className={classes.text}>
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
