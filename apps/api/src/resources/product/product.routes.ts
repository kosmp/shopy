import { routeUtil } from 'utils';

import list from './actions/list';
import create from './actions/create';
import remove from './actions/remove';

const publicRoutes = routeUtil.getRoutes([
  list,
]);

const privateRoutes = routeUtil.getRoutes([
  create,
  remove,
]);

const adminRoutes = routeUtil.getRoutes([

]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
