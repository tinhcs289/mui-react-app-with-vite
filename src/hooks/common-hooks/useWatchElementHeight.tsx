import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

export default function useWatchElementHeight<
  Elmt extends HTMLElement = HTMLElement
>(
  initialHeight: number = 1
): [elementRef: RefObject<Elmt>, heightInPx: number] {
  const ref = useRef<Elmt>(null);
  const [height, setHeight] = useState<number>(initialHeight);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setHeight(ref?.current?.clientHeight || 0);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  return [ref, height];
}
