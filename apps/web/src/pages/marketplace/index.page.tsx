import { NextPage } from 'next';
import Head from 'next/head';

import {
  Flex,
  Grid,
  Stack,
  Text,
  TextInput,
  Space,
  Select,
  Group, UnstyledButton, Container, Skeleton, Pagination,
} from '@mantine/core';

import { IconArrowsDownUp, IconChevronDown } from '@tabler/icons-react';
import { Search } from 'public/images';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { Products, Filters } from 'components';
import { useDebouncedValue } from '@mantine/hooks';
import ActiveFilterPill from 'components/ActiveFilterPill/ActiveFilterPill';
import { productApi } from 'resources/product';
import { useStyles } from './styles';

const selectOptions = [
  'Sort by newest',
  'Sort by oldest',
];

interface ProductsListParams {
  page?: number;
  perPage?: number;
  searchValue?: string;
  sort?: {
    createdOn: 'asc' | 'desc';
  };
  filter?: {
    productPrice?: {
      minPrice: number;
      maxPrice: number;
    };
  };
}

const ITEMS_PER_PAGE = 6;

const Marketplace: NextPage = () => {
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(selectOptions[0]);
  const [inputFilterValueFrom, setInputFilterValueFrom] = useState<number | ''>('');
  const [inputFilterValueTo, setInputFilterValueTo] = useState<number | ''>('');
  const [valueToSearch, setValueToSearch] = useState('');
  const [debouncedValueToSearch] = useDebouncedValue<string>(valueToSearch.toString(), 1500);

  const [params, setParams] = useState<ProductsListParams>({});
  const { data, isLoading: isListLoading } = productApi.useList<ProductsListParams>(params);

  const handleSort = (value: string) => {
    if (value !== null) {
      setParams((prev) => ({
        ...prev,
        sort: value === 'Sort by newest' ? { createdOn: 'desc' } : { createdOn: 'asc' },
      }));
      setSortBy(value);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 30) {
      setValueToSearch(event.target.value);
    }
  };

  useEffect(() => {
    if (inputFilterValueFrom !== ''
        && inputFilterValueTo !== ''
        && inputFilterValueFrom < inputFilterValueTo
    ) {
      setParams((prev) => ({
        ...prev,
        filter: { productPrice: { minPrice: inputFilterValueFrom, maxPrice: inputFilterValueTo } },
      }));
    } else {
      setParams((prev) => ({
        ...prev,
        filter: {},
      }));
    }
  }, [inputFilterValueFrom, inputFilterValueTo]);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      searchValue: debouncedValueToSearch,
    }));
  }, [debouncedValueToSearch]);

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
              onChange={handleSearch}
            />
            <Stack>
              <Flex className={classes.activeFiltersAndResults}>
                <Text>
                  {data?.count ?? 0}
                  {' '}
                  Results
                </Text>
                <Group spacing="6px">
                  <UnstyledButton
                    className={classes.switchButton}
                    onClick={() => handleSort(sortBy === 'Sort by newest' ? 'Sort by oldest' : 'Sort by newest')}
                  >
                    <IconArrowsDownUp size="16px" color="gray" />
                  </UnstyledButton>
                  <Select
                    allowDeselect
                    className={classes.selectSort}
                    data={selectOptions}
                    onChange={handleSort}
                    variant="unstyled"
                    rightSection={<IconChevronDown className={classes.iconChevronDownIcon} />}
                    rightSectionWidth={20}
                    defaultValue="Sort by newest"
                    value={sortBy}
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
            {isListLoading && (
            <>
              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={`sklton-${String(item)}`}
                  height={50}
                  radius="sm"
                  mb="sm"
                />
              ))}
            </>
            )}
            {data?.items.length && !isListLoading ? (
              <Products
                data={data.items}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            ) : (
              <Container p={75}>
                <Text size="xl" color="grey">
                  No products available.
                </Text>
              </Container>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
      <Pagination
        total={Math.ceil((data?.items.length ?? 0) / ITEMS_PER_PAGE)}
        value={currentPage}
        onChange={(newPage) => setCurrentPage(newPage)}
        position="center"
        className={classes.pagination}
      />
    </>
  );
};

export default Marketplace;
