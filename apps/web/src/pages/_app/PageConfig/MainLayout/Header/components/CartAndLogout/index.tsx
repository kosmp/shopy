import { FC } from 'react';
import { Group, Indicator } from '@mantine/core';
import { Cart, Logout } from 'public/images';
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
          <span />
        </Indicator>
      </Link>
      <a href="#" onClick={() => signOut()}>
        <Logout />
      </a>
    </Group>
  );
};

export default CartAndLogout;
