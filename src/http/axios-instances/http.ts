import getBaseApiUrl from "@/environment/getBaseApiUrl";
import Axios from "axios";

const baseURL = getBaseApiUrl();

export const http = Axios.create({
  baseURL,
  timeout: 30000,
  // TODO: [Axios config]
  // turn to `true` for forwarding cookies value to backend
  // only use if and only if CORS credentials are enabled at backend
  // withCredentials: true,
});
console.log("Axios instance was created");
