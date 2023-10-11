import { z } from 'zod';

import { TokenType } from './token.types';

const schema = z.object({
  _id: z.string(),

  type: z.nativeEnum(TokenType),
  value: z.string(),
  userId: z.string(),

  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  deletedOn: z.date().optional().nullable(),
}).strict();

export default schema;
