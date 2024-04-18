import getEnvironmentName from "@/environment/getEnvironmentName";
import { createReduxStore } from "@/helpers/redux-helpers";
import reducers from "./reducers";

const env = getEnvironmentName();
const shouldEnabledDevTools = !!env && env !== "production";

export const reduxStore = createReduxStore(reducers, shouldEnabledDevTools);
