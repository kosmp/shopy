import {NextPage} from "next";
import Head from "next/head";

import {
    Flex,
    Grid,
    Stack,
    Text,
    Button,
    TextInput,
    Space,
    NativeSelect,
    Group,
} from '@mantine/core';
import {useStyles} from "./styles";

import {IconArrowsDownUp, IconChevronDown} from '@tabler/icons-react'
import {Search} from 'public/images';
import {useEffect, useState} from 'react';

import { Products, Filters } from "components";
import { Product } from "types";
import ActiveFilterPill from "../../components/ActiveFilterPill/ActiveFilterPill";


const products : Product[] = [
    { id: 1, name: 'Product 1', price: 24, image: "" },
    { id: 2, name: 'Product 2', price: 654, image: ""},
    { id: 3, name: 'Product 3', price: 23, image: "" },
    { id: 4, name: 'Product 4', price: 75, image: "" },
    { id: 5, name: 'Product 5', price: 643, image: "" },
    { id: 6, name: 'Product 6', price: 135, image: "" },
];


const Marketplace: NextPage = () => {
    const {classes} = useStyles();
    const [numberOfResults, setNumberOfResults] = useState(0);
    const [selectedOption, setSelectedOption] = useState('Sort by newest');
    const [inputFilterValueFrom, setInputFilterValueFrom] = useState<number | ''>('');
    const [inputFilterValueTo, setInputFilterValueTo ] = useState<number | ''>('');


    const handleSwitchClick = () => {
        setSelectedOption(selectedOption === 'Sort by newest' ? 'Sort by oldest' : 'Sort by newest');
    };

    useEffect(() => {

    }, [selectedOption]);

    return (
        <>
            <Head>
                <title>Marketplace</title>
            </Head>
            <Grid>
                <Grid.Col span={3}>
                    <Filters
                        inputValueFrom={inputFilterValueFrom}
                        inputValueTo={inputFilterValueTo}
                        handleInputChangeFrom={setInputFilterValueFrom}
                        handleInputChangeTo={setInputFilterValueTo}
                    />
                </Grid.Col>
                <Grid.Col span={9}>
                    <Stack>
                        <TextInput
                            icon={<Search/>}
                            placeholder="Type to search..."
                            radius="8px"
                        />
                        <Stack>
                            <Flex className={ classes.activeFiltersAndResults }>
                                <Text>{numberOfResults} Results</Text>
                                <Group>
                                    <Button
                                        className={ classes.switchButton }
                                        onClick={handleSwitchClick}
                                    >
                                        <IconArrowsDownUp size={"16px"} color={"gray"} />
                                    </Button>
                                    <NativeSelect
                                        className={ classes.selectSort }
                                        data={['Sort by newest', 'Sort by oldest']}
                                        value={selectedOption}
                                        onChange={(event) => setSelectedOption(event.target.value)}
                                        variant="unstyled"
                                        rightSection={<IconChevronDown/>}
                                        rightSectionWidth={20}
                                    />
                                </Group>
                            </Flex>
                            <Space/>
                            <Group className={ classes.activeFilterPillsGroup }>
                                <ActiveFilterPill
                                    inputValueFrom={inputFilterValueFrom}
                                    inputValueTo={inputFilterValueTo}
                                    handleInputChangeFrom={setInputFilterValueFrom}
                                    handleInputChangeTo={setInputFilterValueTo}
                                />
                            </Group>
                        </Stack>
                        <Products
                            products={products}
                        />
                    </Stack>
                </Grid.Col>
            </Grid>
        </>
    );
}

export default Marketplace;