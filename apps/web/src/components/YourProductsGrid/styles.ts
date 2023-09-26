import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  newProduct: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newProductText: {
    color: 'var(--Blue-600, #2B77EB)',
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '21px',
  },
}));
