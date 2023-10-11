import { routeUtil } from '../../utils';
import stripeWebhook from './stripe/actions';

const publicRoutes = routeUtil.getRoutes([
  stripeWebhook,
]);

export default {
  publicRoutes,
};