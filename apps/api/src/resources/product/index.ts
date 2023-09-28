import productService from './product.service';
import productSchema from './product.schema';
import productRoutes from './product.routes';

import './product.handler';

export * from './product.types';

export {
  productSchema,
  productService,
  productRoutes,
};
