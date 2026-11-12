"use client";

/** Loading: three static muted rows at list-row height. No shimmer and no words; the page says nothing until it has something to say. */
export function LoadingRows() {
  return <ul className="loading-rows" aria-hidden="true"><li /><li /><li /></ul>;
}

/** A failed read: one plain sentence where the rows go and a Try again button. The message stays, with the button disabled, until the new attempt settles. */
export function FailedRead({ message, retrying, retry }: { message: string; retrying: boolean; retry: () => void }) {
  return <div className="failed-read" role="status"><p>{message}</p><button className="button secondary" type="button" disabled={retrying} onClick={retry}>Try again</button></div>;
}
