import { useState, useEffect } from 'react';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export const useSidebar = (breakpoint: number) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAboveBreakpoint = useBreakpoint(breakpoint);

  useEffect(() => {
    if (isAboveBreakpoint) {
      setIsOpen(false);
    }
  }, [isAboveBreakpoint]);

  return {
    isOpen,
    toggle: () => setIsOpen(!isOpen),
    close: () => setIsOpen(false),
  } as const;
};
