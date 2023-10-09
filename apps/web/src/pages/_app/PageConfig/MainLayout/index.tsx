import { FC, ReactElement } from 'react';
import { AppShell } from '@mantine/core';

import Header from './Header';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <AppShell
    header={<Header />}
    styles={() => ({
      root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#FCFCFC',
      },
      main: {
        padding: '32px',
        paddingTop: '104px',
      },
    })}
  >
    {children}
  </AppShell>
);

export default MainLayout;
