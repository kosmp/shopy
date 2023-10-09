import { FC } from 'react';
import { Group, Image, Paper, Stack, Text, UnstyledButton, Badge, Box } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { Product } from 'types';
import { productApi } from 'resources/product';
import { useLocalStorage } from '@mantine/hooks';
import { handleError } from 'utils';
import { accountApi } from 'resources/account';
import { useStyles } from './styles';

const Card : FC<Product> = ({ imageUrl, productName, productPrice, _id, soldOut }) => {
  const { classes } = useStyles();
  const { mutate: removeProduct } = productApi.useRemoveProduct(_id);
  const { mutate: removeFromCart } = accountApi.useRemoveProductFromCart();
  const [checkoutData, setCheckoutData] = useLocalStorage<{ productId: string, priceId: string, pickedQuantity: number, productPrice: number }[]>({ key: 'checkout_data', defaultValue: [], getInitialValueInEffect: false });

  const handleTrashButton = () => {
    setCheckoutData(checkoutData.filter((item) => item.productId !== _id));

    removeFromCart({ productId: _id }, {
      onError: (err) => handleError(err),
    });

    removeProduct();
  };

  return (
    <Paper>
      <Box className={classes.imageBox}>
        <UnstyledButton className={classes.trashButton} onClick={handleTrashButton}>
          <IconTrash color="gray" />
        </UnstyledButton>
        <Badge size="lg" className={soldOut ? classes.productSoldBadge : classes.productOnSaleBadge}>
          {soldOut ? 'Sold' : 'On sale'}
        </Badge>
        <Image src={imageUrl} />
      </Box>
      <Stack spacing="12px" className={classes.namePriceStack}>
        <Text className={classes.text}>{productName}</Text>
        <Group position="apart">
          <Text className={classes.priceTitleText}>Price:</Text>
          <Text className={classes.text}>
            $
            {productPrice}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
};

export default Card;
