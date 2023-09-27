import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  filterCard: {
    padding: '20px',
  },
  firstRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filtersText: {
    fontSize: '20px',
    fontWeight: 700,
  },
  priceText: {
    fontSize: '16px',
    fontWeight: 700,
  },
  filterCellsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftFilterCell: {
    marginRight: '12px',
  },
  resetButton: {
    color: 'var(--Black-300, #A3A3A3)',
  },
}));
