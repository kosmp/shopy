import { stripeService } from 'services';

import { AppKoaContext, AppRouter, Next } from 'types';

async function validator(ctx: AppKoaContext, next: Next) {
  const { user } = ctx.state;

  ctx.assertError(user.stripeId, 'Customer does not have a checkout account');

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const customerSessions = await stripeService.checkout.sessions.list({
    customer: user.stripeId as string,
    expand: ['data.line_items'],
  });

  const successfulSessions = customerSessions.data.filter((session) => session.payment_status === 'paid');

  const data = successfulSessions.map((session) => ({
    productList: session?.line_items?.data.map((item) => ({
      priceId: item.price?.id,
      quantity: item.quantity,
    })) ?? [],
    createdDate: new Date(session.created * 1000),
    payment_status: session.payment_status,
  }));

  ctx.body = [ ...data ];
}

export default (router: AppRouter) => {
  router.get('/get-history', validator, handler);
};