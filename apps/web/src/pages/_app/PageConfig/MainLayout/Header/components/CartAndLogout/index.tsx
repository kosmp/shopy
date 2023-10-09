import { FC } from 'react';
import { Group, Indicator, Text } from '@mantine/core';
import { Cart, Logout } from 'public/icons';
import Link from 'next/link';
import { RoutePath } from 'routes';
import { accountApi } from 'resources/account';
import { useStyles } from './styles';

interface CartAndLogoutProps {
  cartItemCount: number,
}

const CartAndLogout: FC<CartAndLogoutProps> = ({ cartItemCount }) => {
  const { classes } = useStyles();
  const { mutate: signOut } = accountApi.useSignOut();

  return (
    <Group className={classes.cardAndLogoutGroup}>
      <Link href={RoutePath.Cart}>
        <Cart />

        <Indicator
          className={classes.cartIndicator}
          inline
          label={cartItemCount >= 0 ? cartItemCount.toString() : ''}
          size={16}
        >
          <Text span />
        </Indicator>
      </Link>

      <Link href="#" onClick={() => signOut()}>
        <Logout />
      </Link>
    </Group>
  );
};

export default CartAndLogout;
