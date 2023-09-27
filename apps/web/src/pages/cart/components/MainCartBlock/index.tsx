import { FC } from 'react';
import { Container, Skeleton, Stack, Text } from '@mantine/core';
import { productTypes, productApi } from 'resources/product';
import { ColumnDef } from '@tanstack/react-table';
import CartProductsTable from '../CartProductsTable/index';
// import { useStyles } from '../Summary/styles';
import CartSlider from '../CartSlider';

const columns: ColumnDef<productTypes.Product>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Item',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'productName',
    header: 'Item',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'productPrice',
    header: 'Unit Price',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'productPrice',
    header: 'Unit Price',
    cell: (info) => info.getValue(),
  },
];

const MainCartBlock: FC = () => {
  // const { classes } = useStyles();
  const { data, isLoading: isListLoading } = productApi.useList({});

  return (
    <Stack spacing="20px">
      <CartSlider />
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
        <CartProductsTable
          columns={columns}
          data={data.items}
        />
      ) : (
        <Container p={75}>
          <Text size="xl" color="grey">
            No results found, try to adjust your search.
          </Text>
        </Container>
      )}
    </Stack>
  );
};

export default MainCartBlock;
