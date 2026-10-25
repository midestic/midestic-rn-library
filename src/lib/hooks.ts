import { useCallback, useEffect, useRef, useState } from "react";

type UseAppRefreshOptions = {
  /** How long the spinner stays on when no async `onRefresh` is supplied. Default: 1200ms */
  duration?: number;
};

/**
 * Pull-to-refresh helper used by `ThemedScrollView`.
 *
 * Pass an async function to keep the spinner on until the promise settles,
 * or omit it to get a timed refresh (handy for demos / Storybook).
 */
export function useAppRefresh(onRefresh?: () => Promise<unknown> | void, options: UseAppRefreshOptions = {}) {
  const { duration = 1200 } = options;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    if (isMounted.current) {
      setIsRefreshing(true);
    }

    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        await new Promise<void>((resolve) => {
          setTimeout(resolve, duration);
        });
      }
    } finally {
      if (isMounted.current) {
        setIsRefreshing(false);
      }
    }
  }, [onRefresh, duration]);

  return { isRefreshing, refresh };
}
