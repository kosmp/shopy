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
    const [numberOfResults, setNumberOfResults] = useState(0);
    const [selectedOption, setSelectedOption] = useState('Sort by newest');
    const [inputFilterValueFrom, setInputFilterValueFrom] = useState<number | ''>('');
    const [inputFilterValueTo, setInputFilterValueTo ] = useState<number | ''>('');


    const handleSwitchClick = () => {
        setSelectedOption(selectedOption === 'Sort by newest' ? 'Sort by oldest' : 'Sort by newest');
    };

    useEffect(() => {

    }, [selectedOption])

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
                            <Flex style={{justifyContent: "space-between"}}>
                                <Text>{numberOfResults} Results</Text>
                                <Group>
                                    <Button
                                        onClick={handleSwitchClick}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            cursor: 'pointer',
                                            width: '16px',
                                            height: '16px'
                                        }}
                                    >
                                        <IconArrowsDownUp size={"16px"} color={"gray"} />
                                    </Button>
                                    <NativeSelect
                                        data={['Sort by newest', 'Sort by oldest']}
                                        value={selectedOption}
                                        onChange={(event) => setSelectedOption(event.target.value)}
                                        variant="unstyled"
                                        rightSection={<IconChevronDown/>}
                                        rightSectionWidth={20}
                                        style={{ width: "118px" }}
                                    />
                                </Group>
                            </Flex>
                            <Space/>
                            <Group style={{ display: 'inline-flex'}}>
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