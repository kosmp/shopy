import { FC, useEffect, useState } from 'react';
import { Container, Skeleton, Stack, Text } from '@mantine/core';
import { productTypes, productApi } from 'resources/product';
import { ColumnDef } from '@tanstack/react-table';
import { accountApi } from 'resources/account';
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
  const { data: allProducts, isLoading: isListLoading } = productApi.useList({});
  const { data: currentUser } = accountApi.useGet();
  const [data, setData] = useState<Array<productTypes.Product>>([]);

  useEffect(() => {
    if (currentUser !== undefined && allProducts !== undefined) {
      setData(allProducts.items.filter((item) => currentUser.productsInCart.includes(item._id)));
    }
  }, [allProducts, currentUser, currentUser?.productsInCart]);

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
      {data.length ? (
        <CartProductsTable
          columns={columns}
          data={data}
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
