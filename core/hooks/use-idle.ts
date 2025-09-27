/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useState, useEffect, useRef } from "react";

export type UseIdleOptions = {
  timeout?: number;
};

const useIdle = (options?: UseIdleOptions) => {
  const { timeout = 3000 } = options || {};
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsIdle(false);
    timerRef.current = setTimeout(() => setIsIdle(true), timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "touchstart"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeout]);

  return isIdle;
};

export default useIdle;
