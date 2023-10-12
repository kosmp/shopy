import { routeUtil } from 'utils';

import list from './actions/list';
import create from './actions/create';
import remove from './actions/remove';

const privateRoutes = routeUtil.getRoutes([
  list,
  create,
  remove,
]);

export default {
  privateRoutes,
};
