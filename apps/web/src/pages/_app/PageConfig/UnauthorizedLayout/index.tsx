import { FC, ReactElement } from 'react';

import {
  SimpleGrid,
  Image,
  MediaQuery, Group,
} from '@mantine/core';

import { useStyles } from './styles';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  return (
    <Group spacing={0} noWrap grow>
      <div className={classes.wrapper}>
        <main className={classes.content}>
          {children}
        </main>
      </div>

      <MediaQuery
        smallerThan="sm"
        styles={{ display: 'none' }}
      >
        <Image
          alt="app info"
          src="../images/auth_image.png"
          height="100vh"
          fit="scale-down"
        />
      </MediaQuery>
    </Group>
  );
};

export default UnauthorizedLayout;
