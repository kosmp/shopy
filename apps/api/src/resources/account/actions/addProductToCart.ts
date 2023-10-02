import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { userService } from 'resources/user';

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

  if (user && user.productsInCart.length !== undefined && productId) {
    if (!user.productsInCart.includes(productId)) {
      user.productsInCart.push(productId);

      const updatedUser = await userService.updateOne(
        { _id: ctx.state.user._id },
        () => ({ productsInCart: user.productsInCart }),
      );

      ctx.body = userService.getPublic(updatedUser);
    } else {
      ctx.body = userService.getPublic(user);
    }
  } else {
    ctx.status = 404;
    ctx.body = { message: 'User not found or no productsInCart field' };
  }
}

export default (router: AppRouter) => {
  router.patch('/addToCart', validator, validateMiddleware(schema), handler);
};
