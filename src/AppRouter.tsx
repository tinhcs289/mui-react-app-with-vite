import whenAuthenticated from "@/AppRouter.whenAuthenticated";
import whenUnAuthenticated from "@/AppRouter.whenUnAuthenticated";
import withHOCs from "@/helpers/react-helpers/withHocs";
import { Fragment } from "react/jsx-runtime";

const AppRouter = withHOCs(whenAuthenticated, whenUnAuthenticated)(Fragment);

export default AppRouter;
