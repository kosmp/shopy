import { createStyles } from '@mantine/core';

export const useStyles = createStyles((shipTheme) => ({
  filterPillBox: {
    cursor: 'default',
    alignItems: 'center',
    backgroundColor: shipTheme.white,
    border: `1px solid ${shipTheme.colors.gray[4]}`,
    borderRadius: 31,
    padding: '10px 20px',
  },
  valuesBox: {
    fontSize: '14px',
    paddingRight: 8,
    display: 'flex',
    alignItems: 'center',
  },
  removeButton: {
    display: 'flex',
    alignItems: 'center',
  },
}));
