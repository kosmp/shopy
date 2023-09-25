import { Box, Group, UnstyledButton } from '@mantine/core';
import { RemoveButton } from 'public/images';
import { FC, useEffect, useState } from 'react';
import { FilterProps } from 'types';
import { useStyles } from './styles';

const ActiveFilterPill : FC<FilterProps> = ({
  inputValueFrom,
  inputValueTo,
  handleInputChangeFrom,
  handleInputChangeTo,
}) => {
  const { classes } = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inputValueFrom !== ''
            && inputValueTo !== ''
            && inputValueFrom < inputValueTo
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
    <Group spacing={0} className={classes.filterPillBox}>
      <Box className={classes.valuesBox}>
        $
        {inputValueFrom}
        -$
        {inputValueTo}
      </Box>
      <UnstyledButton
        className={classes.removeButton}
        onClick={handleRemoveClick}
      >
        <RemoveButton />
      </UnstyledButton>
    </Group>
  ) : null;
};

export default ActiveFilterPill;
