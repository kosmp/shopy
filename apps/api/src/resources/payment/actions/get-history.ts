import { userService } from 'resources/user';
import { AppKoaContext, AppRouter, Next } from 'types';

async function validator(ctx: AppKoaContext, next: Next) {
  const isUserExists = await userService.exists({ _id: ctx.state.user._id });

  ctx.assertError(isUserExists, 'User not found');

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const purchasedProducts = (await userService.findOne({ _id: user._id }))?.purchasedProducts;
  if (purchasedProducts) {
    ctx.body = [ ...purchasedProducts ];
  } else {
    ctx.body = [];
  }
}

export default (router: AppRouter) => {
  router.get('/get-history', validator, handler);
};