import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  namePriceStack: {
    margin: '16px',
  },
  text: {
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  },
  priceTitleText: {
    color: '#A3A3A3',
  },
  trashButton: {
    position: 'absolute',
    zIndex: 1,
    top: '16px',
    right: '16px',
    borderRadius: 8,
    padding: '6px',
    backgroundColor: '#FFF',
  },
  productSoldBadge: {
    position: 'absolute',
    zIndex: 1,
    bottom: '16px',
    right: '16px',
    fontSize: '14px',
    color: '#17B26A',
    backgroundColor: '#E8F7F0',
  },
  productOnSaleBadge: {
    position: 'absolute',
    zIndex: 1,
    bottom: '16px',
    right: '16px',
    fontSize: '14px',
    color: '#F79009',
    backgroundColor: '#FEF4E6',
  },
  imageBox: {
    position: 'relative',
  },
}));
