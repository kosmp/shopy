import { z } from 'zod';

const schema = z.object({
  _id: z.string(),

  productName: z.string(),
  productPrice: z.number(),
  imageUrl: z.string(),
  soldOut: z.boolean().default(false),

  createdOn: z.date().optional(),
  lastRequest: z.date().optional(),
  deletedOn: z.date().optional().nullable(),
}).strict();

export default schema;