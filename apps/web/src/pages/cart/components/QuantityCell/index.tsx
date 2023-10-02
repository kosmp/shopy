import { FC, useState } from 'react';
import { ActionIcon, Group, Text } from '@mantine/core';

interface QuantityCellProps {
  maxValue: number;
}

const QuantityCell: FC<QuantityCellProps> = ({ maxValue }) => {
  const [value, setValue] = useState<number>(1);

  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < maxValue) {
      setValue(value + 1);
    }
  };

  return (
    <Group spacing={12}>
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
