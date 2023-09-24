import {
    Paper,
    Image,
    Stack,
    Text,
    Flex,
    Button,
} from "@mantine/core";
import { FC } from "react";
import { Product } from "types";

const Card : FC<Product> = ({image, name, price, id}) => {
    return (
        <Paper>
            <Stack>
                <Image src={image}/>
                <Text>{name}</Text>
                <Flex align={"center"} style={{ justifyContent: "space-between" }}>
                    <Text>Price:</Text>
                    <Text>${price}</Text>
                </Flex>
                <Button>
                    Add to Cart
                </Button>
            </Stack>
        </Paper>
    )
}

export default Card;