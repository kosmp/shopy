import { NextPage } from 'next';
import { useState } from 'react';
import { Box, Button, FileButton, Group, Image, Stack, Text, TextInput, UnstyledButton } from '@mantine/core';
import { useStyles } from './styles';

const Create: NextPage = () => {
  const { classes } = useStyles();
  const [imageUrl, setImageUrl] = useState<string | null>('../images/imagePlaceholder.png');

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);
    } else {
      setImageUrl(null);
    }
  };

  return (
    <Box className={classes.externalBox}>
      <Stack spacing="20px">
        <Text size="20px" className={classes.text}>Create New Product</Text>
        <Group spacing="16px">
          <Image src={imageUrl} alt="Uploaded image" width="180px" radius="20px" fit="contain" />
          <FileButton onChange={handleFileChange} accept="image/png,image/jpeg">
            {(props) => <UnstyledButton {...props} className={classes.uploadButton}>Upload Photo</UnstyledButton>}
          </FileButton>
        </Group>
        <Stack spacing="8px">
          <Text size="16px" className={classes.text}>Title of the product</Text>
          <TextInput placeholder="Enter title of the product..." radius="8px" className={classes.inputText} />
        </Stack>
        <Stack spacing="8px">
          <Text size="16px" className={classes.text}>Price</Text>
          <TextInput placeholder="Enter price of the product" radius="8px" className={classes.inputText} />
        </Stack>
      </Stack>
      <Box className={classes.buttonBox}>
        <Button className={classes.uploadProductButton}>
          Upload Product
        </Button>
      </Box>
    </Box>
  );
};

export default Create;
