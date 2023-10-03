import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ActionIcon, Group, Text } from '@mantine/core';
import { useStyles } from '../../styles';

interface QuantityCellProps {
  maxValue: number;
  setOneProductTotalPrice: Dispatch<SetStateAction<number>>;
  productPrice: number;
}

const QuantityCell: FC<QuantityCellProps> = ({ maxValue, setOneProductTotalPrice, productPrice }) => {
  const { classes } = useStyles();
  const [value, setValue] = useState<number>(1);

  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
      setOneProductTotalPrice(value * productPrice);
    }
  };

  const handleIncrement = () => {
    if (value < maxValue) {
      setValue(value + 1);
      setOneProductTotalPrice(value * productPrice);
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
