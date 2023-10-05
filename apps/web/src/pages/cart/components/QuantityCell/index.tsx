import { FC, useEffect, useState } from 'react';
import { ActionIcon, Group, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useStyles } from '../../styles';

interface QuantityCellProps {
  maxValue: number;
  priceId: string;
  productPrice: number;
  productId: string;
}

const QuantityCell: FC<QuantityCellProps> = ({ maxValue, priceId, productPrice, productId }) => {
  const { classes } = useStyles();
  const [checkoutData, setCheckoutData] = useLocalStorage<{ productId: string, priceId: string, pickedQuantity: number, productPrice: number }[]>({ key: 'checkout_data', defaultValue: [], getInitialValueInEffect: false });
  const [value, setValue] = useState<number>(checkoutData?.find((cartProduct: any) => cartProduct.productId === productId)?.pickedQuantity ?? 1);

  const handleDecrement = () => {
    if (value > 1) {
      const foundIndex = checkoutData.findIndex((cartProduct: any) => cartProduct.productId === productId);
      if (foundIndex >= 0) {
        checkoutData[foundIndex].pickedQuantity -= 1;
        setCheckoutData(checkoutData);
      } else {
        setCheckoutData([...checkoutData, { productId, productPrice, priceId, pickedQuantity: value - 1 }]);
      }
      setValue(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < maxValue) {
      const foundIndex = checkoutData.findIndex((cartProduct: any) => cartProduct.productId === productId);
      if (foundIndex >= 0) {
        checkoutData[foundIndex].pickedQuantity += 1;
        setCheckoutData(checkoutData);
      } else {
        setCheckoutData([...checkoutData, { productId, productPrice, priceId, pickedQuantity: value + 1 }]);
      }
      setValue(value + 1);
    }
  };

  return (
    <Group spacing={12} position="right" className={classes.otherColumns}>
      <ActionIcon size={24} variant="transparent" onClick={handleDecrement}>
        –
      </ActionIcon>
      <Text size="md">{value}</Text>
      <ActionIcon size={24} variant="transparent" onClick={handleIncrement}>
        +
      </ActionIcon>
    </Group>
  );
};

export default QuantityCell;
