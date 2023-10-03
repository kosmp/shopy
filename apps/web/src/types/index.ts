export type QueryParam = string | string[] | undefined;

export interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  imageUrl: string;
  soldOut: boolean;
}
