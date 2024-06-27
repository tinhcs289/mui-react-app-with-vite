import { RETURN_URI_HASH } from "@/constants/query-string";
import aesCrypt from "@/helpers/crypt-helpers/aesCrypt";
import toEncodedUri from "@/helpers/string-helpers/toEncodedUri";
import type { RouteConfig } from "@/types";
import { useCallback, useMemo } from "react";

export default function useReturnUri(paramName: string) {
  const query = useMemo(
    () => new URLSearchParams(window?.location?.search),
    []
  );

  const returnUriHash = useMemo(() => query.get(paramName), [paramName, query]);

  const returnUri = useMemo(() => {
    if (!returnUriHash) return "";
    return aesCrypt.decrypt(returnUriHash);
  }, [returnUriHash]);

  const params = useMemo(
    () =>
      Array.from(query.keys()).reduce(
        (a, v) => ({ ...a, [v]: query.get(v) }),
        {}
      ),
    [query]
  );

  const buildReturnHash = useCallback(
    (route?: RouteConfig) => {
      let returnUri = route?.path || window.location.pathname;
      if (!!params && Object.keys(params).length > 0) {
        returnUri = toEncodedUri(returnUri, params);
      }
      return {
        [paramName]: aesCrypt.encrypt(returnUri),
      };
    },
    [paramName, params]
  );

  return {
    returnUri,
    buildReturnHash,
  };
}

export function useReturnUriWhenUnAuthenticate() {
  return useReturnUri(RETURN_URI_HASH);
}
