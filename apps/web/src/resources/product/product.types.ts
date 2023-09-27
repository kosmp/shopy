export interface Product {
  _id: string;
  createdOn?: Date;
  lastRequest?: Date;
  deletedOn?: Date | null;
  imageUrl: string;
  productName: string;
  productPrice: number;
  userFirstNameCreatedBy: string;
  userLastNameCreatedBy: string;
  userFullNameCreatedBy: string;
  userEmailCreatedBy: string;
}
