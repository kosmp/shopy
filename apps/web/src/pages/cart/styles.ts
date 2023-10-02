import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  tab: {
    color: 'var(--Black-300, #A3A3A3)',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    borderRadius: '20px',
    padding: '2px 0px 2px 0px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',

    '&:focus': {
      outline: 'none',
    },

    '&:hover': {
      backgroundColor: 'var(--Black-50, #FCFCFC)',
    },

    '&[data-active]': {
      zIndex: 1,
      backgroundColor: 'var(--Black-50, #FCFCFC)',
      borderColor: 'var(--Black-100, #ECECEE)',
      color: 'var(--mantine-color-white)',

      '&:hover': {
        backgroundColor: 'var(--Black-50, #FCFCFC)',
      },
    },
  },
  leftTabMargin: {
    marginRight: '16px',
  },
  rightTabMargin: {
    marginLeft: '16px',
  },
  mainCartBlockStack: {
    width: '951px',
  },
}));
