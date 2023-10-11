import { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Group } from '@mantine/core';
import { useStyles } from './styles';

const MarketplaceMainTabs: FC = () => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Group spacing={32}>
      <Link
        className={`${classes.tab} ${router.pathname === '/' ? classes.activeTab : ''}`}
        href="/"
      >
        Marketplace
      </Link>

      <Link
        className={`${classes.tab} ${router.pathname.includes('/your-products') ? classes.activeTab : ''}`}
        href="/your-products"
      >
        Your products
      </Link>
    </Group>
  );
};

export default MarketplaceMainTabs;
