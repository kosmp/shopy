import { routeUtil } from 'utils';

import getHistory from './actions/get-history';

const privateRoutes = routeUtil.getRoutes([
  getHistory,
]);

export default {
  privateRoutes,
};