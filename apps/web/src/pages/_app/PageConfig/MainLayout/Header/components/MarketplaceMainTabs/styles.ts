import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  tabsContainer: {
    display: 'flex',
    gap: '32px',
  },
  tab: {
    color: 'var(--Black-300, #A3A3A3)',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    borderRadius: '20px',
    padding: '2px 20px 2px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',

    '&:hover': {
      backgroundColor: 'var(--Black-100, #ECECEE)',
    },

    '&[data-active]': {
      zIndex: 1,
      backgroundColor: 'var(--Black-100, #ECECEE)',
      borderColor: 'var(--Black-100, #ECECEE)',
      color: 'var(--mantine-color-white)',

      '&:hover': {
        backgroundColor: 'var(--Black-100, #ECECEE)',
      },
    },
  },
}));
