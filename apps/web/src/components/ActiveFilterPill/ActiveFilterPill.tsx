import {Box, Button} from "@mantine/core";
import {RemoveButton} from "public/images";
import {FC, useEffect, useState} from "react";
import {useStyles} from './styles';
import {FilterProps} from "types";


const ActiveFilterPill : FC<FilterProps> = ({
                                                          inputValueFrom,
                                                          inputValueTo,
                                                          handleInputChangeFrom,
                                                          handleInputChangeTo
}) => {
    const { classes } = useStyles();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (inputValueFrom !== '' &&
            inputValueTo !== '' &&
            inputValueFrom < inputValueTo
        ) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [inputValueFrom, inputValueTo]);

    const handleRemoveClick = () => {
        setIsVisible(false);
        handleInputChangeFrom('');
        handleInputChangeTo('');
    };

    return isVisible ? (
        <Box className={classes.filterPillBox}>
            <Box className={classes.valuesBox}>
                ${inputValueFrom}-${inputValueTo}
            </Box>
            <Button
                className={classes.closeButton}
                onClick={handleRemoveClick}
            >
                <RemoveButton/>
            </Button>
        </Box>
    ) : null
}

export default ActiveFilterPill;