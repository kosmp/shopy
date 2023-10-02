import { ActionIcon, Group, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { accountApi } from 'resources/account';
import { handleError } from 'utils';
import { FC } from 'react';

interface RemoveButtonProps {
  productId: string;
}

const RemoveButton: FC<RemoveButtonProps> = ({ productId }) => {
  const { mutate: removeFromCart } = accountApi.useRemoveProductFromCart();

  const handleRemove = () => {
    removeFromCart({ productId }, {
      onError: (err) => handleError(err),
    });
  };

  return (
    <ActionIcon variant="transparent">
      <Group spacing={0} grow onClick={handleRemove}>
        <IconX size="20px" />
        <Text>Remove</Text>
      </Group>
    </ActionIcon>
  );
};

export default RemoveButton;
