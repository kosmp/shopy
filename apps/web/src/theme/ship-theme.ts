import { MantineThemeOverride } from '@mantine/core';

const appTheme: MantineThemeOverride = {
  fontFamily: 'Inter',
  components: {
    Button: {
      defaultProps: { size: 'lg' },
      styles: () => ({
        label: {
          color: '#FFF',
          textAlign: 'center',
          fontsize: '14px',
          fontStyle: 'normal',
          fontWeight: 500,
          lineHeight: '21px',
          display: 'flex',
          height: '40px',
          padding: '4px 20px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flex: '1 0 0',
        },
      }),
    },
    Paper: {
      defaultProps: { size: 'lg' },
      styles: () => ({
        root: {
          borderRadius: '12px',
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
