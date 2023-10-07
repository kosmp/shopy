import Stripe from 'stripe';
import config from 'config';
import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import { Next } from 'types';
import { userService } from 'resources/user';
import * as console from 'console';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: '2023-08-16',
});

const schema = z.object({
  checkOutData: z.array(z.object({
    price: z.string(),
    quantity: z.number(),
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

  const foundCurrentCustomerId = (await userService.findOne({
    _id: ctx.state.user._id,
  }))?.stripeId;

  if (!foundCurrentCustomerId) {
    ctx.status = 500;
    ctx.body = { error: 'Current customer id was not found' };
    return;
  }

  const session = await stripe.checkout.sessions.create({
    line_items: checkOutData,
    metadata: {
      line_items: JSON.stringify(checkOutData),
    },
    mode: 'payment',
    success_url: `${config.WEB_URL}/successfull-payment`,
    cancel_url: `${config.WEB_URL}/failed-payment`,
    customer: foundCurrentCustomerId,
  });
  if (session.url) {
    ctx.status = 200;
    ctx.body = { sessionUrl: session.url };
  } else {
    ctx.status = 500;
    ctx.body = { error: 'No result received from cloud storage' };
  }
}

export default (router: AppRouter) => {
  router.post('/create-checkout-session', validateMiddleware(schema), validator, handler);
};