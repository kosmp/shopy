import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
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
