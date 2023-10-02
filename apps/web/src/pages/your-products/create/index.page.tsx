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

const Create: NextPage = () => {
  const { classes } = useStyles();
  const [imageUrl, setImageUrl] = useState<string | null>('../images/imagePlaceholder.png');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('1');
  const [count, setCount] = useState('1');
  const { mutate: uploadProduct } = productApi.useUploadProduct<FormData>();
  const [titleError, setTitleError] = useState<string>('');
  const [priceError, setPriceError] = useState<string>('');
  const [imageError, setImageError] = useState<string | null>(null);
  const [countError, setCountError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setImageError(null);
    setImageFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);
    } else {
      setImageUrl(null);
    }
  };

  const isFileSizeCorrect = (file: any) => {
    const oneMBinBytes = 1048576;
    if ((file.size / oneMBinBytes) > 2) {
      setImageError('Sorry, you cannot upload a file larger than 2 MB.');
      return false;
    }
    return true;
  };

  const isFileFormatCorrect = (file: File | null) => {
    if (!file) return false;
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) return true;
    setImageError('Sorry, you can only upload JPG, JPEG or PNG photos.');
    return false;
  };

  const handleUploadProduct = async () => {
    setImageError(null);

    if (!title) {
      setTitleError('Please fill in the correct product title');
    }

    if (!price) {
      setPriceError('Please fill in the correct product price');
    }

    if (!count) {
      setImageError('Please fill in available count');
      return;
    }

    if (!imageFile) {
      setImageError('Please import product photo');
      return;
    }

    if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile)) {
      const body = new FormData();
      body.append('file', imageFile, imageFile.name);
      body.append('productName', title);
      body.append('productPrice', price);
      body.append('productCount', count);
      body.append('soldOut', String(false));

      await uploadProduct(body, {
        onSuccess: () => router.push('/your-products'),
        onError: (err) => handleError(err),
      });
    }
  };

  return (
    <Box className={classes.externalBox}>
      <Stack spacing="20px">
        <Text size="20px" className={classes.text}>Create New Product</Text>
        <Group spacing="16px">
          <Image src={imageUrl} alt="Uploaded image" width="180px" radius="20px" fit="contain" />
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
          <Text size="16px" className={classes.text}>Title of the product</Text>
          <TextInput
            placeholder="Enter title of the product..."
            radius="8px"
            className={classes.input}
            value={title}
            onChange={(event) => {
              setTitleError('');
              const inputValue = event.currentTarget.value;

              if (inputValue.length <= 30) {
                setTitle(inputValue);
              } else {
                setTitle(inputValue.slice(0, 30));
              }
            }}
            error={titleError}
          />
        </Stack>
        <Stack spacing="8px">
          <Text size="16px" className={classes.text}>Price</Text>
          <NumberInput
            hideControls
            placeholder="Enter price of the product"
            radius="8px"
            className={classes.input}
            value={Number(price) ?? 1}
            onInput={(e) => {
              setPriceError('');
              const inputElement = e.target as HTMLInputElement;
              const inputValue = inputElement.value;

              const numericValue = inputValue.replace(/[^0-9]/g, '');

              if (Number(numericValue) > 99999999) {
                inputElement.value = '99999999';
                setPrice('99999999');
              } else {
                inputElement.value = numericValue;
                setPrice(numericValue === '' ? '1' : numericValue);
              }
            }}
            error={priceError}
          />
        </Stack>
        <Stack spacing="8px">
          <Text size="16px" className={classes.text}>Count of products</Text>
          <NumberInput
            hideControls
            placeholder="Enter available count of products"
            radius="8px"
            className={classes.input}
            value={Number(count) ?? 1}
            onInput={(e) => {
              setCountError('');
              const inputElement = e.target as HTMLInputElement;
              const inputValue = inputElement.value;

              const numericValue = inputValue.replace(/[^0-9]/g, '');

              if (Number(numericValue) > 99999999) {
                inputElement.value = '99999999';
                setCount('99999999');
              } else {
                inputElement.value = numericValue;
                setCount(numericValue === '' ? '1' : numericValue);
              }
            }}
            error={countError}
          />
        </Stack>
      </Stack>
      <Box className={classes.buttonBox}>
        <Button className={classes.uploadProductButton} onClick={handleUploadProduct}>
          Upload Product
        </Button>
      </Box>
    </Box>
  );
};

export default Create;
