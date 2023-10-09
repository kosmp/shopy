export interface PurchaseInfo {
  productId: string,
  productName: string,
  productPrice: number,
  priceId: string,
  purchaseDate: Date,
  imageUrl: string,
}

export interface User {
  _id: string;
  createdOn?: Date;
  updatedOn?: Date;
  lastRequest?: Date;
  deletedOn?: Date | null;
  email: string;
  passwordHash: string;
  signupToken: string | null;
  productsInCart: Array<string>;
  purchasedProducts: Array<PurchaseInfo>;
}
