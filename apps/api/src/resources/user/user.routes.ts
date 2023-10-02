import { routeUtil } from 'utils';

import list from './actions/list';
import addProductToCart from './actions/addProductToCart';
import remove from './actions/remove';
import removeProductFromCart from './actions/removeProductFromCart';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  list,
  addProductToCart,
  removeProductFromCart,
]);

const adminRoutes = routeUtil.getRoutes([
  list,
  remove,
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
