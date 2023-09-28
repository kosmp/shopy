import { AppKoaContext, AppRouter, Next } from 'types';
import { Product, productService } from 'resources/product';
import { validateMiddleware } from 'middlewares';
import { z } from 'zod';

const schema = z.object({
  productName: z.string().min(1, 'Please enter Product name').max(30),
  productPrice: z.number().min(1, 'Please enter Product price').max(10),
  imageUrl: z.string().min(10, 'Please insert Product image'),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}
type Request = {
  body: {
    productName: string;
    productPrice: number;
    imageUrl: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const { productName } = ctx.request.body;
  const isProductExists = await productService.exists({ productName });

  ctx.assertError(!isProductExists, 'Product with such name already exists');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { productName, productPrice, imageUrl } = ctx.request.body;
  
  ctx.body = await productService.insertOne({
    productName,
    productPrice,
    imageUrl,
  });
}


export default (router: AppRouter) => {
  router.post('/product', validateMiddleware(schema), validator, handler);
};
