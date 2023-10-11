import { routeUtil } from 'utils';
import createSession from './actions/createSession';

const privateRoutes = routeUtil.getRoutes([
  createSession,
]);

export default {
  privateRoutes,
};