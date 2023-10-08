import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  externalBox: {
    display: 'inline-block',
  },
  text: {
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
  },
  input: {
    width: '694px',
  },
  uploadButton: {
    borderRadius: 8,
    border: '1px solid var(--Black-200, #CFCFCF)',
    padding: '4px 20px',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '21px',
    color: 'var(--Black-400, #767676)',
  },
  uploadProductButton: {
    marginTop: '28px',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
