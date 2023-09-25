import { FC, useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { useStyles } from './styles';

const MarketplaceMainTabs: FC = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const currentRoute = router.pathname;

    if (currentRoute.includes('/marketplace')) {
      setActiveTab('marketplace');
    } else if (currentRoute.includes('/your-products')) {
      setActiveTab('your products');
    } else {
      setActiveTab('');
    }
  }, [router.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    const newRoute = value === 'marketplace' ? '/marketplace' : '/your-products';

    router.push(newRoute);
  };

  return (
    <Tabs variant="pills" value={activeTab} onTabChange={handleTabChange}>
      <Tabs.List className={classes.tabsContainer}>
        <Tabs.Tab
          className={classes.tab}
          value="marketplace"
        >
          Marketplace
        </Tabs.Tab>
        <Tabs.Tab
          className={classes.tab}
          value="your products"
        >
          Your products
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
};

export default MarketplaceMainTabs;
