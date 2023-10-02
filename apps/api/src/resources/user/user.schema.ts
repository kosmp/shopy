import { z } from 'zod';

const schema = z.object({
  _id: z.string(),

  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string(),
  passwordHash: z.string().nullable().optional(),
  signupToken: z.string().nullable().optional(),
  resetPasswordToken: z.string().nullable().optional(),
  isEmailVerified: z.boolean().default(false),
  avatarUrl: z.string().nullable().optional(),
  oauth: z.object({
    google: z.boolean().default(false),
  }).optional(),
  productsInCart: z.array(z.string()),
  purchasedProducts: z.array(z.object({
    productId: z.string(),
    purchaseDate: z.date(),
    productName: z.string(),
    productPrice: z.number(),
    imageUrl: z.string(),
  }).optional()),

  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  lastRequest: z.date().optional(),
  deletedOn: z.date().optional().nullable(),
}).strict();

export default schema;
