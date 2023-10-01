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
      minPrice: z.string(),
      maxPrice: z.string(),
    }).optional(),
  }).optional(),
  searchValue: z.string().default(''),
  showYourProducts: z.string().default('false'),
  showNotSoldOut: z.string().default('true'),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    perPage, page, sort, searchValue, filter, showYourProducts, showNotSoldOut,
  } = ctx.validatedData;

    type QueryType = {
      productName?: { $regex: RegExp };
      productPrice?: { $gte: number; $lte: number };
      createdBy?: { $eq: string };
      soldOut?: { $eq: boolean }
    };

    const query: QueryType = { };

    if (showNotSoldOut === 'true') {
      query.soldOut = { $eq: false };
    }

    if (searchValue) {
      const regExp = new RegExp(searchValue, 'gi');
      query.productName = { $regex: regExp };
    }

    if (filter?.productPrice !== undefined) {
      query.productPrice = {
        $gte: Number(filter.productPrice.minPrice),
        $lte: Number(filter.productPrice.maxPrice),
      };
    }

    if (showYourProducts === 'true') {
      query.createdBy = { $eq: ctx.state.user._id };
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
  router.get('/', validateMiddleware(schema), handler);
};
