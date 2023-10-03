import { Flex, NumberInput, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { FilterProps } from 'types';
import { useStyles } from './styles';

const Filters: FC<FilterProps> = ({
  inputValueFrom,
  inputValueTo,
  handleInputChangeFrom,
  handleInputChangeTo,
}) => {
  const { classes } = useStyles();
  const [priceValueFrom, setPriceValueFrom] = useState<number | ''>('');
  const [debouncedFrom] = useDebouncedValue<number | ''>(priceValueFrom, 1500);
  const [priceValueTo, setPriceValueTo] = useState<number | ''>('');
  const [debouncedTo] = useDebouncedValue<number | ''>(priceValueTo, 1500);

  useEffect(() => {
    handleInputChangeFrom(debouncedFrom);
    handleInputChangeTo(debouncedTo);
  }, [debouncedFrom, debouncedTo, handleInputChangeFrom, handleInputChangeTo]);

  useEffect(() => {
    setPriceValueFrom(inputValueFrom);
  }, [inputValueFrom]);

  useEffect(() => {
    setPriceValueTo(inputValueTo);
  }, [inputValueTo]);

  const resetFilters = () => {
    setPriceValueFrom('');
    setPriceValueTo('');
    handleInputChangeFrom('');
    handleInputChangeTo('');
  };

  const handleInput = (e: FormEvent<HTMLInputElement>, handler: Dispatch<SetStateAction<number | ''>>) => {
    const inputElement = e.target as HTMLInputElement;
    const inputValue = inputElement.value;

    const numericValue = inputValue.replace(/[^0-9]/g, '');

    inputElement.value = numericValue;

    if (numericValue !== '' && numericValue.length <= 8) {
      handler(Number(numericValue));
    } else if (numericValue !== '' && numericValue.length > 8) {
      handler(0);
    } else {
      handler('');
    }
  };

  return (
    <Paper className={classes.filterCard}>
      <Stack>
        <Flex className={classes.firstRow}>
          <Text className={classes.filtersText}>Filters</Text>
          <UnstyledButton
            className={classes.resetButton}
            variant="transparent"
            onClick={resetFilters}
          >
            Reset All&nbsp;
            <IconX size="10px" />
          </UnstyledButton>
        </Flex>
        <Stack>
          <Text className={classes.priceText}>Price</Text>
          <Flex className={classes.filterCellsContainer}>
            <NumberInput
              className={classes.leftFilterCell}
              hideControls
              placeholder="From:"
              radius="8px"
              value={priceValueFrom}
              onInput={(e) => handleInput(e, setPriceValueFrom)}
            />
            <NumberInput
              hideControls
              placeholder="To:"
              radius="8px"
              value={priceValueTo}
              onInput={(e) => handleInput(e, setPriceValueTo)}
            />
          </Flex>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Filters;
