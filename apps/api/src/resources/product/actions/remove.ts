import { AppKoaContext, AppRouter, Next } from 'types';
import { productService } from 'resources/product';
import { cloudStorageService } from 'services';
import Stripe from 'stripe';
import config from 'config';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isProductExists = await productService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isProductExists, 'Product not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const deletedProduct = await productService.deleteOne({ _id: ctx.request.params.id });

  if (deletedProduct) {
    await stripe.products.update(deletedProduct._id, {
      active: false,
    });

    await cloudStorageService.uploader.destroy(deletedProduct.imagePublicId, (error) => {
      if (error) {
        ctx.status = 500;
        ctx.body = { error: 'Image was not removed from cloud storage' };
      } else {
        ctx.body = {
          deletedProduct,
        };
      }
    });
  }
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
