import { useEffect, useRef } from "react";

type Fn = () => void;

export default function useOutClick(closeFn: Fn){
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    }
  });

  const handler = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeFn();
    }
  }

  return modalRef;
}