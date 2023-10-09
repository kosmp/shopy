import { routeUtil } from 'utils';

import get from './actions/get';
import signUp from './actions/sign-up';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import addProductToCart from './actions/addProductToCart';
import removeProductFromCart from './actions/removeProductFromCart';

const publicRoutes = routeUtil.getRoutes([
  signUp,
  signIn,
  signOut,
]);

const privateRoutes = routeUtil.getRoutes([
  get,
  addProductToCart,
  removeProductFromCart,
]);

export default {
  publicRoutes,
  privateRoutes,
};
