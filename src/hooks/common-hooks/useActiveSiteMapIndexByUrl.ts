import type { SiteMapItem } from "@/types";
import { usePrevious } from "@uidotdev/usehooks";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useActiveSiteMapIndexByUrl(
  items: SiteMapItem[],
  defaultActiveIndex = 0
): [activeIndex: number, setActiveIndex: Dispatch<SetStateAction<number>>] {
  const location = useLocation();
  const prePathname = usePrevious((location?.pathname || "").split(/[?#]/)[0]);

  const isMatchPath = useCallback(
    (url?: string, isExact?: boolean) => {
      if (!url || !location?.pathname) return false;
      const current = location?.pathname.split(/[?#]/)[0];
      const urlWithoutParams = url.split(/[?#]/)[0];
      if (!current) return false;
      if (current === urlWithoutParams) return true;
      if (!isExact && current.indexOf(urlWithoutParams) > -1) return true;
      return false;
    },
    [location?.pathname]
  );

  const findMatchIndex = useCallback(
    () =>
      items
        ?.map((item, i) => {
          return isMatchPath(item?.url, !!item?.matchExact) ? i : -1;
        })
        .find((i) => i >= 0) || defaultActiveIndex,
    [defaultActiveIndex, items, isMatchPath]
  );

  const index = useMemo(() => findMatchIndex(), [findMatchIndex]);

  const [value, setValue] = useState(index);

  useEffect(() => {
    if (!location?.pathname) return;
    const newPath = location?.pathname.split(/[?#]/)[0];
    if (newPath !== prePathname) {
      const newIndex = findMatchIndex();
      setValue(newIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname, findMatchIndex]);

  return [value, setValue];
}