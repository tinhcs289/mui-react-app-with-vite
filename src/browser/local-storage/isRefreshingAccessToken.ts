import { newLocalStorageListenableItem } from "@/helpers/localstorage-helpers";
const isRefreshingAccessToken = newLocalStorageListenableItem<boolean>({
  key: "isRefreshingAccessToken",
});
export default isRefreshingAccessToken;
