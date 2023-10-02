import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { userService } from 'resources/user';
import { productService } from '../../product';

const schema = z.object({
  productId: z.string(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const isUserExists = await userService.exists({ _id: ctx.state.user._id });

  ctx.assertError(isUserExists, 'User not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { productId } = ctx.validatedData;

  const user = await userService.findOne({ _id: ctx.state.user._id });

  if (user && user.purchasedProducts.length !== undefined && productId) {
    const foundProduct = user.purchasedProducts.find((item) => item?.productId === productId);
    const productIndex = user.purchasedProducts.findIndex((item) => item?.productId === productId);


    if (foundProduct) {
      user.purchasedProducts[productIndex] = {
        productId: productId,
        purchaseDate: new Date(),
        productName: foundProduct.productName,
        productPrice: foundProduct.productPrice,
        imageUrl: foundProduct.imageUrl,
      };
    } else {
      const product = await productService.findOne({ _id: productId });

      if (product) {
        user.purchasedProducts.push({
          productId: productId,
          purchaseDate: new Date(),
          productName: product.productName,
          productPrice: product.productPrice,
          imageUrl: product.imageUrl,
        });
      } else {
        ctx.status = 404;
        ctx.body = { message: 'Product not found' };
      }
    }

    const updatedUser = await userService.updateOne(
      { _id: ctx.state.user._id },
      () => ({ purchasedProducts: user.purchasedProducts }),
    );

    ctx.body = userService.getPublic(updatedUser);
  } else {
    ctx.status = 404;
    ctx.body = { message: 'User not found or no productsInCart field' };
  }
}

export default (router: AppRouter) => {
  router.patch('/addPurchaseInfo', validator, validateMiddleware(schema), handler);
};