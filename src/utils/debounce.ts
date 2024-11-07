import { useRef } from 'react';

function useDebounce(callback: Function, delay: number) {
  const timeoutRef = useRef<number | undefined>();

  function debouncedFunction(...args: any[]) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = (window as any).setTimeout(() => {
      callback(...args);
    }, delay);
  }

  return debouncedFunction;
}

export default useDebounce;