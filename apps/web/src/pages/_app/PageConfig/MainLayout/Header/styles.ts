import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  logoText: {
    color: 'black',
    cursor: 'pointer',
    fontFamily: 'DM Sans',
    fontSize: '28.985px',
    fontWeight: 700,
    fontStyle: 'normal',
  },
  headerContainer: {
    minHeight: '104px',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'var(--Black-50, #FCFCFC)',
  },
}));