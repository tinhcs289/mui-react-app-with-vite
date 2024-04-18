export type States = {
  /**
   * `true` incase `refresh-token` request failed
   */
  isSessionTimeout: boolean;
  /**
   * `true` incase current `access-token` are changes (eg: login in with another account or using external authorized `access-token`)
   */
  isSessionChange: boolean;
  /**
   * `true` incase logged-in in another browser tab
   */
  isSessionChangeToLoggedIn: boolean;
  /**
   * `true` incase logged-out in another browser tab
   */
  isSessionChangeToLoggedOut: boolean;
};
