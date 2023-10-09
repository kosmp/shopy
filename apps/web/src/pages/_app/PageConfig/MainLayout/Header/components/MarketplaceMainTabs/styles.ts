import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  tab: {
    color: '#A3A3A3',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    borderRadius: '20px',
    padding: '6px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
    textDecoration: 'none',

    '&:hover': {
      backgroundColor: '#ECECEE',
    },
  },
  activeTab: {
    backgroundColor: '#ECECEE',
    color: '#201F22',
    cursor: 'default',
  },
}));
