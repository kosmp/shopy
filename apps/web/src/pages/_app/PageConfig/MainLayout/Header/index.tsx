import { memo, FC, useState, useEffect } from 'react';
import { RoutePath } from 'routes';
import {
  Header as LayoutHeader,
  Container,
  Text,
} from '@mantine/core';
import { Link } from 'components';
import { LogoImage } from 'public/images';
import { accountApi } from 'resources/account';
import { useStyles } from './styles';
import MarketplaceMainTabs from './components/MarketplaceMainTabs';

import ShadowLoginBanner from './components/ShadowLoginBanner';
import CartAndLogout from './components/CartAndLogout';

const Header: FC = () => {
  const { classes } = useStyles();
  const { data: account } = accountApi.useGet();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (account?.productsInCart?.length !== undefined) {
      setCount(account?.productsInCart?.length);
    }
  }, [account]);

  if (!account) return null;

  return (
    <LayoutHeader height="72px">
      {account.isShadow && <ShadowLoginBanner email={account.email} />}
      <Container
        className={classes.headerContainer}
        fluid
      >
        <Link underline={false} type="router" href={RoutePath.Home}>
          <LogoImage />
          <Text className={classes.logoText}>Shopy</Text>
        </Link>
        <MarketplaceMainTabs />
        <CartAndLogout cartItemCount={count} />
      </Container>
    </LayoutHeader>
  );
};

export default memo(Header);
