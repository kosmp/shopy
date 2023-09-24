import { createStyles } from '@mantine/core';


export const useStyles = createStyles((shipTheme) => ({
    activeFiltersAndResults: {
        justifyContent: "space-between"
    },
    switchButton: {
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        width: '16px',
        height: '16px'
    },
    selectSort: {
        width: "118px"
    },
    activeFilterPillsGroup: {
        display: 'inline-flex'
    }
}))