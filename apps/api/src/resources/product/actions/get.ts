import { AppKoaContext, AppRouter } from 'types';
import { productService } from 'resources/product';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {

  const product = await productService.find({
    _id: ctx.request.params.id,
  });

  ctx.body = { product };
}

export default (router: AppRouter) => {
  router.get('/:id', handler);
};