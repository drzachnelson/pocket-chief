"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    // E2E runs the demo repository, which is intentionally unavailable under `next start`.
    // The public flag lets that test exercise the real worker without changing production's
    // registration rule or allowing demo content in a production deployment.
    if ("serviceWorker" in navigator && (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENABLE_SERVICE_WORKER_TESTS === "true")) {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => undefined);
    }
  }, []);
  return null;
}
