"use client";

import { WarningCircle } from "@phosphor-icons/react";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <div className="empty-state"><span className="empty-icon"><WarningCircle size={24} /></span><h2>Pocket Chief could not load this view</h2><p>Your approved content is unchanged. Check your connection or retry.</p><button className="button" onClick={reset}>Try again</button></div>;
}
