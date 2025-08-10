import type { Config, Driver, DriveStep } from "driver.js";
import { driver } from "driver.js";
import { type RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import "driver.js/dist/driver.css";

export type DriverGuideStep = DriveStep;
export type DriverGuideStepsFactory = (helpers: {
  stop: () => void;
  driverRef: React.RefObject<Driver | null>;
}) => DriverGuideStep[];

export interface UseDriverGuideOptions {
  enabled: boolean;
  steps: DriverGuideStep[] | DriverGuideStepsFactory;
  onStart?: () => void;
  onComplete?: () => void;
}

export interface UseDriverGuideReturn {
  start: () => void;
  stop: () => void;
  driverRef: RefObject<Driver | null>;
}

export function useDriverGuide({
  enabled,
  steps,
  onStart,
  onComplete,
}: UseDriverGuideOptions): UseDriverGuideReturn {
  const driverRef = useRef<Driver | null>(null);
  const hasStartedRef = useRef(false);
  const startFnRef = useRef<() => void>(() => {});
  const stopFnRef = useRef<() => void>(() => {});

  const baseOptions: Pick<Config, "showProgress" | "showButtons"> &
    Partial<Config> = useMemo(
    () => ({
      showProgress: true,
      showButtons: ["previous", "next", "close"],
    }),
    []
  );

  const stop = useCallback(() => {
    if (driverRef.current) {
      try {
        driverRef.current.destroy();
      } finally {
        driverRef.current = null;
        hasStartedRef.current = false;
        onComplete?.();
      }
    }
  }, [onComplete]);

  const start = useCallback(() => {
    if (driverRef.current) {
      try {
        driverRef.current.destroy();
      } catch {}
    }
    const resolvedSteps: DriverGuideStep[] =
      typeof steps === "function"
        ? (steps as DriverGuideStepsFactory)({ stop, driverRef })
        : steps;

    const options: Config = {
      ...baseOptions,
      steps: resolvedSteps,
    } as Config;

    driverRef.current = driver(options);
    onStart?.();
    hasStartedRef.current = true;
    driverRef.current.drive();
  }, [onStart, baseOptions, steps, stop]);

  useEffect(() => {
    startFnRef.current = start;
    stopFnRef.current = stop;
  });

  useEffect(() => {
    if (enabled && !hasStartedRef.current) {
      startFnRef.current();
    }
    if (!enabled && hasStartedRef.current) {
      stopFnRef.current();
    }
    return () => {
      if (driverRef.current) {
        try {
          driverRef.current.destroy();
        } finally {
          driverRef.current = null;
          hasStartedRef.current = false;
        }
      }
    };
  }, [enabled]);

  return { start, stop, driverRef };
}
