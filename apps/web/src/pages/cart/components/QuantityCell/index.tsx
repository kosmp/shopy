import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ActionIcon, Group, Text } from '@mantine/core';
import { useStyles } from '../../styles';
import { CheckOutData } from '../../types';

interface QuantityCellProps {
  maxValue: number;
  priceId: string;
  productPrice: number;
  checkOutData: CheckOutData[];
  setCheckoutData: Dispatch<SetStateAction<CheckOutData[]>>
}

const QuantityCell: FC<QuantityCellProps> = ({ maxValue, priceId, productPrice, checkOutData, setCheckoutData }) => {
  const { classes } = useStyles();
  const [value, setValue] = useState<number>(checkOutData?.find((cartProduct: any) => cartProduct.priceId === priceId)?.pickedQuantity ?? 1);

  useEffect(() => {
    if (value === 1) {
      const foundIndex = checkOutData.findIndex((cartItem) => cartItem.priceId === priceId);

      if (foundIndex === -1) {
        setCheckoutData([...checkOutData, {
          priceId,
          productPrice,
          pickedQuantity: value,
        }]);
      }
    }
  }, []);

  const handleDecrement = () => {
    if (value > 1) {
      const foundIndex = checkOutData.findIndex((cartItem) => cartItem.priceId === priceId);

      if (foundIndex >= 0) {
        setCheckoutData(checkOutData.map((cartItem) => ({
          priceId: cartItem.priceId,
          productPrice,
          pickedQuantity: cartItem.priceId === priceId ? (cartItem.pickedQuantity - 1) : cartItem.pickedQuantity,
        })));
      } else {
        setCheckoutData([...checkOutData, {
          priceId,
          productPrice,
          pickedQuantity: value,
        }]);
      }

      setValue(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < maxValue) {
      const foundIndex = checkOutData.findIndex((cartItem) => cartItem.priceId === priceId);

      if (foundIndex >= 0) {
        setCheckoutData(checkOutData.map((cartItem) => ({
          priceId: cartItem.priceId,
          productPrice,
          pickedQuantity: cartItem.priceId === priceId ? (cartItem.pickedQuantity + 1) : cartItem.pickedQuantity,
        })));
      } else {
        setCheckoutData([...checkOutData, {
          priceId,
          productPrice,
          pickedQuantity: value,
        }]);
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
