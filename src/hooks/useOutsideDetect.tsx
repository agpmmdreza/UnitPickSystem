import {useEffect, useRef, useState} from "react";

// hook that detect outside click
export default function useOutsideDetect(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] =
    useState<boolean>(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
