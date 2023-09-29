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
  Group, UnstyledButton, SelectItem, Container, Skeleton, Pagination,
} from '@mantine/core';

import { IconArrowsDownUp, IconChevronDown } from '@tabler/icons-react';
import { Search } from 'public/images';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Products, Filters } from 'components';
// import { useDebouncedValue } from '@mantine/hooks';
import ActiveFilterPill from 'components/ActiveFilterPill/ActiveFilterPill';
import { productApi } from 'resources/product';
import { useStyles } from './styles';

const selectOptions: SelectItem[] = [
  {
    value: 'newest',
    label: 'Sort by newest',
  },
  {
    value: 'oldest',
    label: 'Sort by oldest',
  },
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
      minPrice: number | '';
      maxPrice: number | '';
    };
  };
}

const ITEMS_PER_PAGE = 6;

const Marketplace: NextPage = () => {
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(selectOptions[0].value);
  const [inputFilterValueFrom, setInputFilterValueFrom] = useState<number | ''>('');
  const [inputFilterValueTo, setInputFilterValueTo] = useState<number | ''>('');
  const [valueToSearch, setValueToSearch] = useState('');
  // const [debouncedValueToSearch] = useDebouncedValue<string>(valueToSearch.toString(), 1500);

  const [params, setParams] = useState<ProductsListParams>({});
  const { data, isLoading: isListLoading } = productApi.useList(params);

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
    setParams((prev) => ({
      ...prev,
      sort: value === 'newest' ? { createdOn: 'desc' } : { createdOn: 'asc' },
    }));
  }, []);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValueToSearch(event.target.value);
  }, []);

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
                <Group>
                  <UnstyledButton
                    className={classes.switchButton}
                    onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
                  >
                    <IconArrowsDownUp size="16px" color="gray" />
                  </UnstyledButton>
                  <Select
                    className={classes.selectSort}
                    data={selectOptions}
                    value={sortBy}
                    onChange={handleSort}
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
            {data?.items.length ? (
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
        total={Math.ceil(data?.items.length ?? 0 / ITEMS_PER_PAGE)}
        value={currentPage}
        onChange={(newPage) => setCurrentPage(newPage)}
        position="center"
        className={classes.pagination}
      />
    </>
  );
};

export default Marketplace;
