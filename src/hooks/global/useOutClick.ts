import { useEffect, useRef } from "react";

type Fn = () => void;

export default function useOutClick(closeFn: Fn){
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    }
  });

  const handler = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      closeFn();
    }
  }

  return ref;
}