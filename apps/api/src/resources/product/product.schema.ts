import { z } from 'zod';

const schema = z.object({
  _id: z.string(),

  productName: z.string(),
  productPrice: z.number(),
  priceId: z.string(),
  imageUrl: z.string(),
  imagePublicId: z.string(),
  soldOut: z.boolean(),
  createdBy: z.string(),
  productCount: z.number(),

  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
}).strict();

export default schema;
