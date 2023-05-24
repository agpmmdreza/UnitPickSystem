/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback} from "react";

// hook that has functionality for Debounce (wait and do)
function useDebounce(callback: (...args: any[]) => any, timeout: number) {
  const debounce = (_cb: (...args: any[]) => any) => {
    let timer: any;
    return function (...args: any[]) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        _cb(...args);
      }, 500);
    };
  };

  let debouncedFunction = useCallback(debounce(callback), []);
  return debouncedFunction;
}

export default useDebounce;
