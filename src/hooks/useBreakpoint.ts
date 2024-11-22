import { useState, useEffect, useCallback } from 'react';

export const useBreakpoint = (breakpoint: number) => {
  const checkBreakpoint = useCallback(
    () => window.innerWidth >= breakpoint,
    [breakpoint]
  );

  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(checkBreakpoint);

  useEffect(() => {
    const handleResize = () => setIsAboveBreakpoint(checkBreakpoint());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkBreakpoint]);

  return isAboveBreakpoint;
};
