import { AppKoaContext, AppRouter, Next } from 'types';
import { productService } from 'resources/product';
import { validateMiddleware } from 'middlewares';
import { z } from 'zod';
import { cloudStorageService } from 'services';
import multer from '@koa/multer';
import Stripe from 'stripe';
import config from 'config';

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

const uploader = multer();

const schema = z.object({
  productName: z.string().min(1, 'Please enter Product name').max(30),
  productPrice: z.string().min(1, 'Please enter Product price').max(8),
  productCount: z.string().min(1, 'Please enter Product count').max(8),
  soldOut: z.string().default('false'),
});

type ValidatedData = z.infer<typeof schema>;


async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { productName } = ctx.validatedData;
  const isProductExists = await productService.exists({ productName });

  ctx.assertError(!isProductExists, 'Product with such name already exists');

  await next();
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { productName, productPrice, soldOut, productCount } = ctx.validatedData;
  const { file } = ctx.request;

  try {
    const res = await new Promise<CloudinaryUploadResult | undefined>((resolve, reject) => {
      cloudStorageService.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      ).end(file.buffer);
    });

    if (res) {
      const product = await stripe.products.create({
        name: productName,
        active: true,
        images: [ res.secure_url ],
      });

      const price = await stripe.prices.create({
        unit_amount: Number(productPrice + '00'),
        currency: 'usd',
        product: product.id,
      });

      if (!product || !price) {
        ctx.status = 500;
        ctx.body = { error: 'The product was not created in checkout' };
      }

      await productService.insertOne({
        _id: product.id,
        imageUrl: res.secure_url,
        imagePublicId: res.public_id,
        productName,
        productPrice: Number(productPrice),
        priceId: price.id,
        productCount: Number(productCount),
        soldOut: soldOut === 'true',
        createdBy: ctx.state.user._id,
      });

      ctx.body = {
        priceId: price.id,
        imageUrl: res.secure_url,
        imagePublicId: res.public_id,
        productName,
        productPrice: Number(productPrice),
        productCount: Number(productCount),
        soldOut: soldOut === 'true',
        createdBy: ctx.state.user._id,
      };
    } else {
      ctx.status = 500;
      ctx.body = { error: 'No result received from cloud storage' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error uploading to cloud storage' };
  }
}


export default (router: AppRouter) => {
  router.post('/', uploader.single('file'), validateMiddleware(schema), validator, handler);
};
