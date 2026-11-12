// The States resolution's two shared surfaces for a list that reads on the device (Saved today; Home and the search results page reuse them). No hooks here, so a server page can render the loading rows too.

/** Loading: three static muted rows at list-row height. No shimmer and no words. */
export function LoadingRows() {
  return <div className="loading-rows" aria-hidden="true"><div /><div /><div /></div>;
}

/** A failed read: one plain sentence where the rows go, and a button that runs the read again in place. The sentence stays, with the button off, until the new attempt settles. */
export function ReadFailed({ message, retrying, onRetry }: { message: string; retrying: boolean; onRetry: () => void }) {
  return (
    <div className="list-state">
      <p role="status">{message}</p>
      <button type="button" className="button secondary small" disabled={retrying} onClick={onRetry}>Try again</button>
    </div>
  );
}
