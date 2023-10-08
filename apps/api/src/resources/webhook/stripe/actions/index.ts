import config from 'config';
import Stripe from 'stripe';
import { AppKoaContext, AppRouter, Next } from 'types';
import { productService } from 'resources/product';
import { userService } from 'resources/user';

import { stripeService } from 'services';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: '2023-08-16',
});

interface ValidatedData {
  event: Stripe.Event;
}

interface PurchaseProduct {
  productId: string,
  purchaseDate: Date,
  productName: string,
  productPrice: number,
  priceId: string,
  imageUrl: string
}

async function validator(ctx: AppKoaContext, next: Next) {
  const signature = ctx.request.header['stripe-signature'];

  ctx.assertError(signature, 'Stripe signature header is missing');

  try {
    const event = stripeService.webhooks.constructEvent(ctx.request.rawBody, signature, config.STRIPE_ENDPOINT_SECRET);

    ctx.validatedData = {
      event,
    };
  } catch (err: any) {
    ctx.throwError(`Webhook Error: ${err.message}`);
  }

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { event } = ctx.validatedData;

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const sessionId = session.id;

      const purchaseList = (await stripe.checkout.sessions.listLineItems(sessionId)).data;
      const priceIds = purchaseList.map((purchaseItem) => purchaseItem.price?.id).filter((priceId) => priceId !== undefined) as string[];

      const filter = { priceId: { $in: priceIds } };

      const cartElementsToDelete: string[] = [];

      await productService.updateMany({ ...filter }, (doc) => {
        const purchasedCount = purchaseList.find((purchaseItem) => purchaseItem.price?.id === doc.priceId)?.quantity ?? 0;

        if (doc.productCount - purchasedCount === 0) {
          cartElementsToDelete.push(doc._id);

          return ({
            productCount: 0,
            soldOut: true,
          });
        }

        return ({
          productCount: doc.productCount - purchasedCount,
        });
      });

      const customer = await stripe.customers.retrieve(session.customer as string) as Stripe.Customer;
      const customerMetadata = customer.metadata;
      const userId = customerMetadata.userId;

      await userService.updateOne({ _id: userId }, (doc) => {

        const updatedProductsInCart = doc.productsInCart.filter((productId) => {
          return !cartElementsToDelete.some((idToDelete) => idToDelete === productId);
        });

        return ({
          productsInCart: updatedProductsInCart,
        });
      });

      const productsList: PurchaseProduct[] = [];

      for (const el of purchaseList) {
        const product = await productService.findOne({ priceId: el.price?.id });

        if (product) {
          productsList.push({
            productId: product._id,
            purchaseDate: new Date(),
            productName: product.productName,
            productPrice: product.productPrice,
            priceId: product.priceId,
            imageUrl: product.imageUrl,
          });
        }
      }

      await userService.updateOne({ _id: userId }, (doc) => {
        return ({
          purchasedProducts: [...doc.purchasedProducts, ...productsList],
        });
      });
  }

  ctx.status = 200;
}

export default (router: AppRouter) => {
  router.post('/stripe', validator, handler);
};