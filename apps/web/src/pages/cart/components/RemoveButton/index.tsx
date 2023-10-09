import { ActionIcon, Group, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { FC } from 'react';
import { accountApi } from 'resources/account';
import { handleError } from 'utils';
import { useLocalStorage } from '@mantine/hooks';
import { useStyles } from '../../styles';

interface RemoveButtonProps {
  productId: string;
}

const RemoveButton: FC<RemoveButtonProps> = ({ productId }) => {
  const { classes } = useStyles();
  const { mutate: removeFromCart } = accountApi.useRemoveProductFromCart();
  const [checkoutData, setCheckoutData] = useLocalStorage<{ productId: string, priceId: string, pickedQuantity: number, productPrice: number }[]>({ key: 'checkout_data', defaultValue: [], getInitialValueInEffect: false });

  const handleRemove = () => {
    setCheckoutData(checkoutData.filter((item) => item.productId !== productId));

    removeFromCart({ productId }, {
      onError: (err) => handleError(err),
    });
  };

  return (
    <ActionIcon variant="transparent" className={classes.otherColumns}>
      <Group spacing={0} grow onClick={handleRemove}>
        <IconX size="20px" />

        <Text>
          Remove
        </Text>
      </Group>
    </ActionIcon>
  );
};

export default RemoveButton;
