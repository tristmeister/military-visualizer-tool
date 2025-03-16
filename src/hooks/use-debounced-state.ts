import { useState, useEffect, useCallback } from 'react';

type UseDebouncedStateReturn<T> = [
  T,
  (value: T) => void,
  T
];

export function useDebouncedState<T>(initialValue: T, delay: number): UseDebouncedStateReturn<T> {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  const setValueWithDebounce = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  return [debouncedValue, setValueWithDebounce, value];
}