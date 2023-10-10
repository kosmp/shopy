import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Group, NumberInput, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { FilterProps } from '../../types';
import { useStyles } from './styles';

const schema = z.object({
  priceValueFrom: z.union([z.number().min(0).max(99999999), z.literal('')]),
  priceValueTo: z.union([z.number().min(0).max(99999999), z.literal('')]),
});

export type FilterValuesFormFarams = z.infer<typeof schema>;

const Filters: FC<FilterProps> = ({
  inputValueFrom,
  inputValueTo,
  handleInputChangeFrom,
  handleInputChangeTo,
}) => {
  const methods = useForm<FilterValuesFormFarams>({
    resolver: zodResolver(schema),
    defaultValues: { priceValueFrom: inputValueFrom, priceValueTo: inputValueTo },
    mode: 'onChange',
  });
  const { classes } = useStyles();
  const [debouncedFrom] = useDebouncedValue<number | ''>(methods.watch('priceValueFrom'), 1000);
  const [debouncedTo] = useDebouncedValue<number | ''>(methods.watch('priceValueTo'), 1000);

  useEffect(() => {
    if (!methods.formState.errors.priceValueFrom) {
      handleInputChangeFrom(debouncedFrom);
    }
  }, [debouncedFrom]);

  useEffect(() => {
    if (!methods.formState.errors.priceValueTo) {
      handleInputChangeTo(debouncedTo);
    }
  }, [debouncedTo]);

  useEffect(() => {
    methods.setValue('priceValueFrom', inputValueFrom);
    if (inputValueFrom === '' && methods.formState.errors.priceValueFrom) {
      methods.clearErrors('priceValueFrom');
    }
  }, [inputValueFrom]);

  useEffect(() => {
    methods.setValue('priceValueTo', inputValueTo);
    if (inputValueTo === '' && methods.formState.errors.priceValueTo) {
      methods.clearErrors('priceValueTo');
    }
  }, [inputValueTo]);

  const resetFilters = () => {
    handleInputChangeFrom('');
    handleInputChangeTo('');
    methods.setValue('priceValueFrom', '');
    methods.setValue('priceValueTo', '');
  };

  return (
    <Paper p="20px">
      <Stack spacing="32px">
        <Group position="apart">
          <Text fz="20px" fw={700}>
            Filters
          </Text>

          <UnstyledButton
            className={classes.resetButton}
            variant="transparent"
            onClick={resetFilters}
          >
            Reset All&nbsp;

            <IconX size="10px" />
          </UnstyledButton>
        </Group>

        <Stack>
          <Text fz="16px" fw="700">
            Price
          </Text>

          <Group spacing={12} position="apart" align="flex-start" noWrap>
            <Controller
              name="priceValueFrom"
              control={methods.control}
              render={({ field }) => (
                <NumberInput
                  className={classes.leftFilterCell}
                  hideControls
                  placeholder="From:"
                  radius={8}
                  value={field.value}
                  onChange={field.onChange}
                  error={methods.formState.errors.priceValueFrom?.message}
                />
              )}
            />

            <Controller
              name="priceValueTo"
              control={methods.control}
              render={({ field }) => (
                <NumberInput
                  hideControls
                  placeholder="To:"
                  radius={8}
                  value={field.value}
                  onChange={field.onChange}
                  error={methods.formState.errors.priceValueTo?.message}
                />
              )}
            />
          </Group>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Filters;
