import { z } from 'zod';

import { AppKoaContext, Next, AppRouter } from 'types';
import { validateMiddleware } from 'middlewares';
import { userService } from 'resources/user';
import * as console from 'console';

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
  console.log(1);
  console.log(productId);
  const user = await userService.findOne({ _id: ctx.state.user._id });
  console.log(2);
  if (user && user.productsInCart.length !== undefined && productId) {
    console.log(user.productsInCart);
    const indexOfProductId = user.productsInCart.indexOf(productId);

    if (indexOfProductId !== -1) {
      user.productsInCart.splice(indexOfProductId, 1);

      const updatedUser = await userService.updateOne(
        { _id: ctx.state.user._id },
        () => ({ productsInCart: user.productsInCart }),
      );
      console.log(3);
      console.log(user.productsInCart);
      ctx.body = userService.getPublic(updatedUser);
    } else {
      console.log(4);
      console.log(user.productsInCart);
      ctx.body = userService.getPublic(user);
    }
  } else {
    ctx.status = 404;
    ctx.body = { message: 'User not found or no productsInCart field' };
  }
}

export default (router: AppRouter) => {
  router.patch('/removeFromCart', validator, validateMiddleware(schema), handler);
};
