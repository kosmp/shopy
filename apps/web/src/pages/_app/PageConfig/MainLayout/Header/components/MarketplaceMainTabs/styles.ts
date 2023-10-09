import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  tabsContainer: {
    display: 'flex',
    gap: '32px',
  },
  tab: {
    color: '#A3A3A3',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    borderRadius: 20,
    padding: '2px 20px 2px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',

    '&:focus': {
      outline: 'none',
    },

    '&:hover': {
      backgroundColor: '#ECECEE',
    },

    '&[data-active]': {
      zIndex: 1,
      backgroundColor: '#ECECEE',
      borderColor: '#ECECEE',
      color: 'var(--mantine-color-white)',

      '&:hover': {
        backgroundColor: '#ECECEE',
      },
    },
  },
}));
