import {Dispatch, SetStateAction} from "react";

export type QueryParam = string | string[] | undefined;


export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface FilterProps {
    inputValueFrom: number | '',
    inputValueTo: number | '',
    handleInputChangeFrom: Dispatch<SetStateAction<number | ''>>,
    handleInputChangeTo: Dispatch<SetStateAction<number | ''>>
}