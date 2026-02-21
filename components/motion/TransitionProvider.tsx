"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";

type TransitionContextValue = {
  registerExit: (fn: () => Promise<void> | void) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionContext() {
  const ctx = useContext(TransitionContext);
  return ctx;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const exitFnsRef = useRef<Array<() => Promise<void> | void>>([]);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const registerExit = (fn: () => Promise<void> | void) => {
    exitFnsRef.current.push(fn);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;
    const runExit = async () => {
      const fns = exitFnsRef.current;
      exitFnsRef.current = [];
      await Promise.all(fns.map((f) => f()));
    };
    runExit();
  }, [pathname, prefersReducedMotion]);

  return (
    <TransitionContext.Provider value={{ registerExit }}>
      {children}
    </TransitionContext.Provider>
  );
}
