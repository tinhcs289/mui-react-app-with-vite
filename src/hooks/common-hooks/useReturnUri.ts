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
    if (!returnUriHash) return null;
    return aesCrypt.decrypt(
      returnUriHash
        .replace(/p1L2u3S/g, "+")
        .replace(/s1L2a3S4h/g, "/")
        .replace(/e1Q2u3A4l/g, "=")
    );
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
        [paramName]: aesCrypt.encrypt(
          returnUri
            .replace(/\+/g, "p1L2u3S")
            .replace(/\//g, "s1L2a3S4h")
            .replace(/=/g, "e1Q2u3A4l")
        ),
      };
    },
    [paramName, params]
  );

  return {
    returnUri,
    buildReturnHash,
  };
}
