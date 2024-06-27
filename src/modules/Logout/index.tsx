import CommonFallback from "@/components/fallback/CommonFallback";
import { HttpRequestStatus } from "@/constants/http-request-status";
import PATHS from "@/constants/paths";
import { actions, logoutRequestStatusSelector } from "@/redux/authentication";
import { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const redirectToNextPage = () => {
  if (
    !(
      !!window &&
      !!window?.location &&
      typeof window.location.replace === "function"
    )
  )
    return;
  window.location.replace(PATHS.login);
};

const Logout = memo(() => {
  const requestStatus = useSelector(logoutRequestStatusSelector);

  const isSuccess = useMemo(
    () => requestStatus === HttpRequestStatus.REQUESTSUCCESS,
    [requestStatus]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSuccess) return;
    redirectToNextPage();
  }, [isSuccess]);

  useEffect(() => {
    const handleLogout = async () => {
      dispatch(actions.requestLogout(null));
      return;
    };

    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CommonFallback />;
});

Logout.displayName = "Logout";

export default Logout;
