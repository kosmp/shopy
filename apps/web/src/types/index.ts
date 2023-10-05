export type QueryParam = string | string[] | undefined;

export interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  priceId: string;
  imageUrl: string;
  soldOut: boolean;
}
