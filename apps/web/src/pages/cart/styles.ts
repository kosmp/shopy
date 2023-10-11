import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  tab: {
    color: '#A3A3A3',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    borderRadius: 20,
    padding: '2px 0px 2px 0px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',

    '&:focus': {
      outline: 'none',
    },

    '&:hover': {
      backgroundColor: '#FCFCFC',
    },

    '&[data-active]': {
      zIndex: 1,
      backgroundColor: '#FCFCFC',
      borderColor: '#ECECEE',
      color: 'var(--mantine-color-white)',

      '&:hover': {
        backgroundColor: '#FCFCFC',
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
  firstColumnMyCart: {
    width: '519px',
  },
  firstColumnHistory: {
    width: '663px',
  },
  otherColumns: {
    width: '144px',
    textAlign: 'right',
  },
  headersText: {
    color: '#767676',
  },
}));
