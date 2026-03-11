import { useState, useRef, useCallback, useEffect } from "react";

export function useExpandCollapse(collapseDelay = 300) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleEnter = useCallback((id: string) => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setExpandedId(id);
  }, []);

  const handleLeave = useCallback(() => {
    collapseTimerRef.current = setTimeout(() => {
      setExpandedId(null);
    }, collapseDelay);
  }, [collapseDelay]);

  const handleFocus = useCallback((id: string) => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    setExpandedId(id);
  }, []);

  const handleBlur = useCallback(() => {
    collapseTimerRef.current = setTimeout(() => {
      setExpandedId(null);
    }, collapseDelay - 100);
  }, [collapseDelay]);

  return { expandedId, toggle, handleEnter, handleLeave, handleFocus, handleBlur };
}
