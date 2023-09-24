import {createStyles, rem} from '@mantine/core';


export const useStyles = createStyles((shipTheme) => ({
    filterPillBox: {
        display: 'flex',
        cursor: 'default',
        alignItems: 'center',
        backgroundColor: shipTheme.white,
        border: `${rem(1)} solid ${shipTheme.colors.gray[4]}`,
        borderRadius: "31px",
        padding: "10px 20px",
    },
    valuesBox: {
        lineHeight: 1,
        fontSize: rem(14),
        paddingRight: 8,
    },
    closeButton: {
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        width: '16px',
        height: '16px'
    }
}))