import Stripe from 'stripe';
import config from 'config';
import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import { Next } from 'types';
import { userService } from 'resources/user';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

const schema = z.object({
  checkOutData: z.array(z.object({
    price: z.string(),
    quantity: z.number(),
    priceAmount: z.number(),
  })),
});

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const isUserExists = await userService.exists({ _id: ctx.state.user._id });

  ctx.assertError(isUserExists, 'User not found');

  await next();
}

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { checkOutData } = ctx.validatedData;

  const session = await stripe.checkout.sessions.create({
    line_items: checkOutData,
    mode: 'payment',
    success_url: `${config.WEB_URL}?success=true`,
    cancel_url: `${config.WEB_URL}?canceled=true`,
  });

  if (session.url) {
    ctx.redirect(session.url);
  } else {
    ctx.status = 500;
    ctx.body = { error: 'No result received from cloud storage' };
    ctx.throw(500, 'Failed to create payment session');
  }
}

export default (router: AppRouter) => {
  router.post('/create-checkout-session', validateMiddleware(schema), validator, handler);
};