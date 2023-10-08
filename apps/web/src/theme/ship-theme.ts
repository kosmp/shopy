import { MantineThemeOverride } from '@mantine/core';

const appTheme: MantineThemeOverride = {
  fontFamily: 'Inter',
  components: {
    Button: {
      defaultProps: { size: 'sm' },
      styles: () => ({
        label: {
          color: '#FFF',
          fontsize: '14px',
          fontStyle: 'normal',
          fontWeight: 500,
          display: 'flex',
          justifyContent: 'center',
        },
        root: {
          padding: '4px 20px',
          borderRadius: 8,
        },
      }),

    },
    Paper: {
      defaultProps: { size: 'lg' },
      styles: () => ({
        root: {
          borderRadius: 12,
          border: '1.126px solid var(--Black-100, #ECECEE)',
          background: '#FFF',
          overflow: 'hidden',
          position: 'relative',
        },
      }),
    },
  },
};

export default appTheme;
