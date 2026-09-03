"use client";

import { useEffect } from "react";
import { loadLibrary } from "@/lib/library-client";

/** Seeds IndexedDB from the shipped library asset so saved and offline reads have content. */
export function OfflineHydrator() {
  useEffect(() => { loadLibrary().catch(() => undefined); }, []);
  return null;
}
