import React, { FC } from 'react';
import { Button, Image, Stack, Text } from '@mantine/core';
import { useStyles } from './styles';

const EmptyStateCard: FC = () => {
  const { classes } = useStyles();

  return (
    <Stack spacing={20} align="center" className={classes.stack}>
      <Image maw={206} src="images/balloon_empty_state.png" />
      <Stack spacing={20} align="center">
        <Text fw={600} fz="20px">
          Oops, there&apos;s nothing here yet!
        </Text>
        <Text fz="14px" color="#767676" align="center">
          You haven&apos;t made any purchases yet.
          Go to the marketplace and make purchases.
        </Text>
        <a href="/marketplace">
          <Button>
            Go to Marketplace
          </Button>
        </a>
      </Stack>
    </Stack>
  );
};

export default EmptyStateCard;
