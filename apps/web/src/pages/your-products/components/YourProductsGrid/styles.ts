import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  emptyArrayNewCard: {
    paddingTop: '82px',
    paddingBottom: '82px',
    textDecoration: 'none',
  },
  notEmptyArrayNewCard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  newProductText: {
    color: '#2B77EB',
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '21px',
  },
}));
