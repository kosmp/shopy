import { z } from 'zod';

import { AppKoaContext, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { productService } from 'resources/product';

const schema = z.object({
  page: z.string().transform(Number).default('1'),
  perPage: z.string().transform(Number).default('10'),
  sort: z.object({
    createdOn: z.enum(['asc', 'desc']),
  }).default({ createdOn: 'desc' }),
  filter: z.object({
    productPrice: z.object({
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    }).nullable().default(null),
  }).nullable().default(null),
  searchValue: z.string().default(''),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    perPage, page, sort, searchValue, filter,
  } = ctx.validatedData;

    type QueryType = {
      productName?: { $regex: RegExp };
      productPrice?: { $gte?: number; $lte?: number };
    };

    const query: QueryType = {};

    if (searchValue) {
      const regExp = new RegExp(searchValue, 'gi');
      query.productName = { $regex: regExp };
    }

    if (filter?.productPrice?.minPrice !== undefined || filter?.productPrice?.maxPrice !== undefined) {
      query.productPrice = {};

      if (filter.productPrice.minPrice !== undefined) {
        query.productPrice.$gte = filter.productPrice.minPrice;
      }

      if (filter.productPrice.maxPrice !== undefined) {
        query.productPrice.$lte = filter.productPrice.maxPrice;
      }
    }

    const products = await productService.find(
      query,
      { page, perPage },
      { sort },
    );

    ctx.body = {
      items: products.results,
      totalPages: products.pagesCount,
      count: products.count,
    };
}

export default (router: AppRouter) => {
  router.get('/products', validateMiddleware(schema), handler);
};
