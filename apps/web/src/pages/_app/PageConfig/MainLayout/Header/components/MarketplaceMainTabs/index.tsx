import { FC, useState } from 'react';
import { Tabs } from '@mantine/core';
import { useStyles } from './styles';

const MarketplaceMainTabs: FC = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState('marketplace');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs variant="pills" defaultValue={activeTab} onTabChange={handleTabChange}>
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
