import { useCallback, useState } from 'react';

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw == null ? initial : JSON.parse(raw);
    } catch {
      return initial;
    }
  });
  const set = useCallback(
    (next) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage blocked: keep in-memory value */
      }
    },
    [key]
  );
  return [value, set];
}
