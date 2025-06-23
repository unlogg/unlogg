"use client";

import { useState, useEffect } from "react";

type UseLocalStorageOptions<T> = {
  key: string;
  defaultValue: T;
};

type UseLocalStorageReturn<T> = [T, (value: T) => void];

function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorageOptions<T>): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      // Return default value if running in a non-browser environment
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error(`Error accessing localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setValue = (value: T) => {
    if (typeof window === "undefined") {
      console.warn("localStorage is not available in this environment.");
      return;
    }

    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
      }
    } catch (error) {
      console.error(`Error initializing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  return [storedValue, setValue];
}

export { useLocalStorage };
export type { UseLocalStorageOptions, UseLocalStorageReturn };
