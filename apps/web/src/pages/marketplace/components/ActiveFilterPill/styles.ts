import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  filterPillBox: {
    cursor: 'default',
    alignItems: 'center',
    backgroundColor: '#FFF',
    border: '1px solid #ECECEE',
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
