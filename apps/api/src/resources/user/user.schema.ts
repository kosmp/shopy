import { z } from 'zod';

const schema = z.object({
  _id: z.string(),

  email: z.string(),
  passwordHash: z.string().nullable().optional(),
  stripeId: z.string().optional().nullable(),
  signupToken: z.string().nullable().optional(),
  isEmailVerified: z.boolean().default(false),
  productsInCart: z.array(z.string()),
  purchasedProducts: z.array(z.object({
    productId: z.string(),
    purchaseDate: z.date(),
    productName: z.string(),
    productPrice: z.number(),
    priceId: z.string(),
    imageUrl: z.string(),
  }).optional()),

  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  lastRequest: z.date().optional(),
  deletedOn: z.date().optional().nullable(),
}).strict();

export default schema;
