import { FC } from 'react';
import { Group, UnstyledButton } from '@mantine/core';
import { useStyles } from '../Summary/styles';

const CartSlider: FC = () => {
  const { classes } = useStyles();

  return (
    <Group spacing="32px">
      <UnstyledButton>
        My cart
      </UnstyledButton>
      <UnstyledButton>
        History
      </UnstyledButton>
    </Group>
  );
};

export default CartSlider;
