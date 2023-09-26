import {
  Paper,
  Image,
  Stack,
  Text,
  Button, Group,
} from '@mantine/core';
import { FC } from 'react';
import { Product } from 'types';
import { useStyles } from './styles';

const Card : FC<Product> = ({ image, name, price, id, sold }) => {
  const { classes } = useStyles();

  const handleAddToCart = () => {

  };

  return (
    <Paper>
      <Stack>
        <Image src={image} />
        <Stack className={classes.namePriceButtonStack}>
          <Stack spacing="13.51px">
            <Text className={classes.text}>{name}</Text>
            <Group position="apart">
              <Text className={classes.priceTitleText}>Price:</Text>
              <Text className={classes.text}>
                $
                {price}
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
