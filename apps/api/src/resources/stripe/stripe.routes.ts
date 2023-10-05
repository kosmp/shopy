import { routeUtil } from 'utils';
import createSession from './actions/createSession';

const publicRoutes = routeUtil.getRoutes([

]);

const privateRoutes = routeUtil.getRoutes([
  createSession,
]);

const adminRoutes = routeUtil.getRoutes([

]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};