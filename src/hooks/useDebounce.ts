import React from "react";

export type UseDebounce = <T>(value: T, wait?: number) => T;

export const useDebounce: UseDebounce = <T>(value: T, delay: number = 300) => {
  const [debauncedValue, setDebauncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebauncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debauncedValue;
};
