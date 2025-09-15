import React, { useSyncExternalStore } from "react";

export const useMediaQuery = (query: string): boolean => {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);

      return () => matchMedia.removeEventListener("change", callback);
    },
    [query]
  );
  const getSnapshot = React.useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
