import config from 'config';

import Stripe from 'stripe';
import logger from 'logger';

import { userService } from 'resources/user';
import type { User } from 'resources/user';
import type { ClientSession } from '@paralect/node-mongo';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, { typescript: true, apiVersion: '2023-08-16' });

const createAndAttachStripeAccount = async (user: User, session?: ClientSession): Promise<void | null> => {
  try {

    if (!config.STRIPE_SECRET_KEY) return null;

    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user._id,
      },
    });

    await userService.atomic.updateOne(
      { _id: user._id },
      {
        $set: {
          stripeId: customer.id,
        },
      },
      {},
      { session },
    );
  } catch (error) {
    logger.error(`Error creating stripe account for user ${user._id}`, error);
    throw error;
  }
};

export default {
  ...stripe,
  createAndAttachStripeAccount,
};