import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  summaryCard: {
    padding: '20px',
    minWidth: '315px',
  },
  summaryTitleText: {
    color: 'var(--Black-600, #201F22)',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  },
  totalPriceTitle: {
    color: 'var(--Black-400, #767676)',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
  },
}));
