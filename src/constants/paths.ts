export const PATHS_AUTH = {
  /**
   * @url '/auth/login'
   */
  login: "/auth/login",
  /**
   * @url '/auth/logout'
   */
  logout: "/auth/logout",
  /**
   * @url '/auth/register'
   */
  register: "/auth/register",
  /**
   * @url '/auth/activate-your-account'
   */
  userAccountActivate: "/auth/activate-your-account",
  /**
   * @url '/auth/forget-password'
   */
  forgetPassword: "/auth/forget-password",
  /**
   * @url '/auth/*'
   */
  authNotFound: "/auth/*",
};

const PATHS = {
  /**
   * @url '/not-found'
   */
  notfound: "/not-found",
  ...PATHS_AUTH,
  /**
   * @url '/module-in-development'
   */
  inDevelop: "/module-in-development",
  /**
   * @url '/dashboard'
   */
  main: "/dashboard",
  /**
   * @url '/dashboard'
   */
  dashboard: "/dashboard",
  customers: "/khach-hang",
  report: "/bao-cao",
  orders: "/don-hang",
  ordersBuy: "/don-hang/don-mua",
  ordersSell: "/don-hang/don-ban",
  ordersProcess: "/don-hang/xu-ly-don-hang",
};
export default PATHS;
