import authentication from "./authentication";
import session from "./session";
import snackbar from "./snackbar";
import userAccount from "./userAccount";
import userProfile from "./userProfile";

// TODO: add more redux reducer here
const reducers = [snackbar, authentication, userAccount, userProfile, session];
export default reducers;
