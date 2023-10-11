import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function useLocalStorage<T>(options: {
  defaultValue: T;
  key: string;
}): [T, Dispatch<SetStateAction<T>>] {
  const { key, defaultValue } = options;

  const [value, setValue] = useState(
    JSON.parse(window.localStorage.getItem(key) ?? "null") ?? defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
