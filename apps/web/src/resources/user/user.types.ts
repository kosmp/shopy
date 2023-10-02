export interface PurchaseInfo {
  productId: string,
  purchasedDate: Date,
}

export interface User {
  _id: string;
  createdOn?: Date;
  updatedOn?: Date;
  lastRequest?: Date;
  deletedOn?: Date | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  passwordHash: string;
  isEmailVerified: boolean;
  isShadow: boolean | null;
  signupToken: string | null;
  resetPasswordToken?: string | null;
  avatarUrl?: string | null;
  oauth?: {
    google: boolean
  };
  productsInCart: Array<string>;
  purchasedProducts: Array<PurchaseInfo>;
}
