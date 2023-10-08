import { routeUtil } from 'utils';

import get from './actions/get';
import update from './actions/update';
import signUp from './actions/sign-up';
import signIn from './actions/sign-in';
import signOut from './actions/sign-out';
import verifyEmail from './actions/verify-email';
import verifyResetToken from './actions/verify-reset-token';
import resendEmail from './actions/resend-email';
import addProductToCart from './actions/addProductToCart';
import removeProductFromCart from './actions/removeProductFromCart';

const publicRoutes = routeUtil.getRoutes([
  signUp,
  signIn,
  signOut,
  verifyEmail,
  verifyResetToken,
  resendEmail,
]);

const privateRoutes = routeUtil.getRoutes([
  get,
  update,
  addProductToCart,
  removeProductFromCart,
]);

export default {
  publicRoutes,
  privateRoutes,
};
