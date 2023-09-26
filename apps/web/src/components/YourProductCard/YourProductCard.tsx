import { FC, useState } from 'react';
import { Product } from 'types';
import { Group, Image, Paper, Stack, Text, UnstyledButton, Badge, Box } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useStyles } from './styles';

const Card : FC<Product> = ({ image, name, price, id, sold }) => {
  const { classes } = useStyles();

  const handleTrashButton = () => {

  };

  return (
    <Paper>
      <Box className={classes.imageBox}>
        <UnstyledButton className={classes.trashButton} onClick={handleTrashButton}>
          <IconTrash color="gray" />
        </UnstyledButton>
        <Badge size="lg" className={sold ? classes.productSoldBadge : classes.productOnSaleBadge}>
          {sold ? 'Sold' : 'On sale'}
        </Badge>
        <Image src={image} />
      </Box>
      <Stack spacing="12px" className={classes.namePriceStack}>
        <Text className={classes.text}>{name}</Text>
        <Group position="apart">
          <Text className={classes.priceTitleText}>Price:</Text>
          <Text className={classes.text}>
            $
            {price}
          </Text>
        </Group>
      </Stack>
    </Paper>
  );
};

export default Card;
