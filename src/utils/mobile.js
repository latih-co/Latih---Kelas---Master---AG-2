import { useState, useEffect } from "react";

/**
 * Returns true if viewport width is <= 640px (mobile).
 * Automatically re-renders on resize.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return isMobile;
}
