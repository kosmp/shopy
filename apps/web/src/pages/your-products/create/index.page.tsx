import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NextPage } from 'next';
import { useState } from 'react';
import {
  Box,
  Button,
  FileButton,
  Group,
  Image,
  NumberInput,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { productApi } from 'resources/product';
import { handleError } from 'utils';
import router from 'next/router';
import { useStyles } from './styles';

const ONE_MB_MIN_BYTES = 1048576;

const schema = z.object({
  productTitle: z.string().min(1, 'Product name must be from 1 to 30 symbols').max(30).nullable(),
  productPrice: z.number().min(1, { message: 'Product price must be a number from 1 to 99999999' }).max(99999999, { message: 'Product price must be a number from 1 to 99999999' }).nullable(),
  productCount: z.number().min(1, { message: 'Product count must be a number from 1 to 99999999' }).max(99999999, { message: 'Product count must be a number from 1 to 99999999' }).nullable(),
});

export type CreateProductParams = z.infer<typeof schema>;

const Create: NextPage = () => {
  const { classes } = useStyles();
  const [imageUrl, setImageUrl] = useState<string | null>('../images/imagePlaceholder.png');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutate: uploadProduct } = productApi.useUploadProduct<FormData>();
  const [imageError, setImageError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm<CreateProductParams>({
    resolver: zodResolver(schema),
    defaultValues: { productTitle: null, productPrice: undefined, productCount: undefined },
    mode: 'onChange',
  });

  const handleFileChange = (selectedFile: File | null) => {
    setImageError(null);
    setImageFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);

      return;
    }

    setImageUrl(null);
  };

  const isFileSizeCorrect = (file: any) => {
    if ((file.size / ONE_MB_MIN_BYTES) > 2) {
      setImageError('Sorry, you cannot upload a file larger than 2 MB.');

      return false;
    }

    return true;
  };

  const isFileFormatCorrect = (file: File | null) => {
    if (!file) {
      return false;
    }

    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      return true;
    }

    setImageError('Sorry, you can only upload JPG, JPEG or PNG photos.');

    return false;
  };

  const handleUploadProduct = () => {
    setImageError(null);

    if (!imageFile) {
      setImageError('Please import product photo');

      return;
    }

    setLoading(true);
    if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile) && methods && methods.getValues('productPrice') && methods.getValues('productCount')
      && !methods.getFieldState('productTitle').invalid && !methods.getFieldState('productPrice').invalid && !methods.getFieldState('productCount').invalid) {
      const body = new FormData();
      body.append('file', imageFile, imageFile.name);
      body.append('productName', methods.getValues('productTitle') as string);
      body.append('productPrice', methods?.getValues('productPrice')?.toString() as string);
      body.append('productCount', methods?.getValues('productCount')?.toString() as string);
      body.append('soldOut', String(false));

      uploadProduct(body, {
        onSuccess: async () => {
          await router.push('/your-products');
          setLoading(false);
        },
        onError: (err) => handleError(err),
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <Box className={classes.externalBox}>
      <Stack spacing={20}>
        <Text size={20} className={classes.text}>
          Create New Product
        </Text>

        <Group spacing="16px">
          <Image src={imageUrl} alt="Uploaded image" width="180px" radius={20} fit="contain" />

          <FileButton onChange={handleFileChange} accept="image/png,image/jpeg,image/jpg">
            {(props) => <UnstyledButton {...props} className={classes.uploadButton}>Upload Photo</UnstyledButton>}
          </FileButton>
        </Group>

        {imageError && (
        <Text color="red" size="16px">
          {imageError}
        </Text>
        )}

        <Stack spacing="8px">
          <Text size="16px" className={classes.text}>
            Title of the product
          </Text>

          <TextInput
            placeholder="Enter title of the product..."
            radius={8}
            className={classes.input}
            {...methods.register('productTitle')}
            error={methods.formState.errors.productTitle?.message}
          />
        </Stack>

        <Stack spacing="8px">
          <Text size="16px" className={classes.text}>
            Price
          </Text>

          <Controller
            name="productPrice"
            control={methods.control}
            render={({ field }) => (
              <NumberInput
                hideControls
                placeholder="Enter price of the product"
                radius={8}
                className={classes.input}
                value={field.value ?? ''}
                onChange={field.onChange}
                error={methods.formState.errors.productPrice?.message}
              />
            )}
          />
        </Stack>

        <Stack spacing="8px">
          <Text size="16px" className={classes.text}>
            Count of products
          </Text>

          <Controller
            name="productCount"
            control={methods.control}
            render={({ field }) => (
              <NumberInput
                hideControls
                placeholder="Enter available count of products"
                radius={8}
                className={classes.input}
                value={field.value ?? ''}
                onChange={field.onChange}
                error={methods.formState.errors.productCount?.message}
              />
            )}
          />
        </Stack>
      </Stack>

      <Box className={classes.buttonBox}>
        <Button className={classes.uploadProductButton} onClick={handleUploadProduct} loading={loading}>
          Upload Product
        </Button>
      </Box>
    </Box>
  );
};

export default Create;
