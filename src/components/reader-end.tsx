import { Disclaimer } from "@/components/disclaimer";

// UTC so the printed date does not shift with the build machine's timezone.
const updated = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** Below the tab panels on every tab: when the page was last updated, then the disclaimer line, which stays last. */
export function ReaderEnd({ updatedAt }: { updatedAt: string }) {
  return <div className="reader-end"><p>Last updated {updated.format(new Date(updatedAt))}</p><Disclaimer /></div>;
}
