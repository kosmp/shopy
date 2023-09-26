import { NextPage } from 'next';
import Head from 'next/head';

import {
  Flex,
  Grid,
  Stack,
  Text,
  TextInput,
  Space,
  NativeSelect,
  Group, UnstyledButton, Pagination,
} from '@mantine/core';

import { IconArrowsDownUp, IconChevronDown } from '@tabler/icons-react';
import { Search } from 'public/images';
import React, { useEffect, useState } from 'react';

import { Products, Filters } from 'components';
import { Product } from 'types';
import { useDebouncedValue } from '@mantine/hooks';
import { useStyles } from './styles';
import ActiveFilterPill from '../../components/ActiveFilterPill/ActiveFilterPill';

const products : Product[] = [
  { id: 1, name: 'Product 1', price: 24, image: 'images/test-image1.png', sold: false },
  { id: 2, name: 'Product 2', price: 654, image: 'images/test-image2.png', sold: false },
  { id: 3, name: 'Product 3', price: 23, image: 'images/test-image2.png', sold: false },
  { id: 4, name: 'Product 4', price: 75, image: 'images/test-image2.png', sold: false },
  { id: 5, name: 'Product 5', price: 643, image: 'images/test-image2.png', sold: false },
  { id: 6, name: 'Product 6', price: 135, image: 'images/test-image2.png', sold: false },
];

const Marketplace: NextPage = () => {
  const { classes } = useStyles();
  const [numberOfResults, setNumberOfResults] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [selectedOption, setSelectedOption] = useState('Sort by newest');
  const [inputFilterValueFrom, setInputFilterValueFrom] = useState<number | ''>('');
  const [inputFilterValueTo, setInputFilterValueTo] = useState<number | ''>('');
  const [valueToSearch, setValueToSearch] = useState('');
  const [debouncedValueToSearch] = useDebouncedValue<string>(valueToSearch.toString(), 1500);

  const handleSwitchClick = () => {
    setSelectedOption(selectedOption === 'Sort by newest' ? 'Sort by oldest' : 'Sort by newest');
  };

  useEffect(() => {

  }, [selectedOption]);

  useEffect(() => {

  }, [debouncedValueToSearch]);

  useEffect(() => {
    // if (inputFilterValueFrom !== ''
    //     && inputFilterValueTo !== ''
    //     && inputFilterValueFrom < inputFilterValueTo
    // ) {
    //
    // }
  }, [inputFilterValueFrom, inputFilterValueTo]);

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>
      <Grid>
        <Grid.Col span={3}>
          <Filters
            inputValueFrom={inputFilterValueFrom}
            inputValueTo={inputFilterValueTo}
            handleInputChangeFrom={setInputFilterValueFrom}
            handleInputChangeTo={setInputFilterValueTo}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <Stack>
            <TextInput
              icon={<Search />}
              placeholder="Type to search..."
              radius="8px"
              size="lg"
              value={valueToSearch}
              onChange={(event) => setValueToSearch(event.currentTarget.value)}
            />
            <Stack>
              <Flex className={classes.activeFiltersAndResults}>
                <Text>
                  {numberOfResults}
                  {' '}
                  Results
                </Text>
                <Group>
                  <UnstyledButton
                    className={classes.switchButton}
                    onClick={handleSwitchClick}
                  >
                    <IconArrowsDownUp size="16px" color="gray" />
                  </UnstyledButton>
                  <NativeSelect
                    className={classes.selectSort}
                    data={['Sort by newest', 'Sort by oldest']}
                    value={selectedOption}
                    onChange={(event) => setSelectedOption(event.target.value)}
                    variant="unstyled"
                    rightSection={<IconChevronDown />}
                    rightSectionWidth={20}
                  />
                </Group>
              </Flex>
              <Space />
              <Group className={classes.activeFilterPillsGroup}>
                <ActiveFilterPill
                  inputValueFrom={inputFilterValueFrom}
                  inputValueTo={inputFilterValueTo}
                  handleInputChangeFrom={setInputFilterValueFrom}
                  handleInputChangeTo={setInputFilterValueTo}
                />
              </Group>
            </Stack>
            <Products
              products={products}
            />
          </Stack>
        </Grid.Col>
      </Grid>
      <Pagination total={numberOfPages} position="center" className={classes.pagination} />
    </>
  );
};

export default Marketplace;
