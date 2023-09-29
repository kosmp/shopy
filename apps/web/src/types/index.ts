import { Dispatch, SetStateAction } from 'react';

export type QueryParam = string | string[] | undefined;

export interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  imageUrl: string;
  soldOut: boolean;
}

export interface FilterProps {
  inputValueFrom: number | '',
  inputValueTo: number | '',
  handleInputChangeFrom: Dispatch<SetStateAction<number | ''>>,
  handleInputChangeTo: Dispatch<SetStateAction<number | ''>>
}
