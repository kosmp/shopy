import { FC, useEffect, useState } from 'react';
import {
  Container,
  Group,
  Image,
  Skeleton,
  Stack,
  Tabs,
  Text,
} from '@mantine/core';
import { productTypes, productApi } from 'resources/product';
import { ColumnDef } from '@tanstack/react-table';
import { accountApi } from 'resources/account';
import CartProductsTable from '../CartProductsTable/index';
import { useStyles } from './styles';
import QuantityCell from './QuantityCell';
import RemoveButton from './RemoveButton';

const myCartColums: ColumnDef<productTypes.Product>[] = [
  {
    accessorKey: 'imageAndProductName',
    header: 'Item',
    cell: (info) => (
      <Group spacing="25px">
        <Image
          width="80"
          height="80"
          radius="8px"
          src={info.row.original.imageUrl}
          alt={info.row.original.productName}
        />
        <Text size="16px" fw={700}>
          {info.row.original.productName}
        </Text>
      </Group>
    ),
  },
  {
    accessorKey: 'productPrice',
    header: 'Unit Price',
    cell: (info) => (
      <Text>
        $
        {info.row.original.productPrice}
      </Text>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: (info) => <QuantityCell maxValue={info.row.original.productCount} />,
  },
  {
    accessorKey: 'removeButton',
    header: '',
    cell: (info) => <RemoveButton productId={info.row.original._id} />,
  },
];

// const historyColums: ColumnDef<productTypes.Product>[] = [
//   {
//     accessorKey: 'imageAndProductName',
//     header: 'Item',
//     cell: (info) => (
//       <Group spacing="25px">
//         <Image
//           width="80"
//           height="80"
//           radius="8px"
//           src={info.row.original.imageUrl}
//           alt={info.row.original.productName}
//         />
//         <Text size="16px" fw={700}>
//           {info.row.original.productName}
//         </Text>
//       </Group>
//     ),
//   },
//   {
//     accessorKey: 'productPrice',
//     header: 'Unit Price',
//     cell: (info) => (
//       <Text>
//         $
//         {info.row.original.productPrice}
//       </Text>
//     ),
//   },
// ];

const MainCartBlock: FC = () => {
  const { classes } = useStyles();
  const { data: allProducts, isLoading: isListLoading } = productApi.useList({});
  const { data: currentUser } = accountApi.useGet();
  const [data, setData] = useState<Array<productTypes.Product>>([]);
  const [currentTabValue, setCurrentTabValue] = useState('');

  useEffect(() => {
    if (currentUser !== undefined && allProducts !== undefined) {
      setData(allProducts.items.filter((item) => currentUser.productsInCart?.includes(item._id)));
    }
  }, [allProducts, currentUser, currentUser?.productsInCart]);

  return (
    <Stack spacing="20px">
      <Tabs defaultValue="my cart" variant="pills" activateTabWithKeyboard onTabChange={(value: string) => setCurrentTabValue(value)}>
        <Tabs.List>
          <Tabs.Tab value="my cart" className={`${classes.tab} ${classes.leftTabMargin}`}>My cart</Tabs.Tab>
          <Tabs.Tab value="history" className={`${classes.tab} ${classes.rightTabMargin}`}>History</Tabs.Tab>
        </Tabs.List>
      </Tabs>
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
          columns={myCartColums}
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
