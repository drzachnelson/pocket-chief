import { HomeLists } from "@/components/home-lists";
import { listRecentlyAdded } from "@/lib/library";

// Home is the shared field (the shell's) and three lists in one 760px column. Recently added is read here, at build time, and handed down as a prop; the other two read this device's history in the browser, so the static HTML holds the hidden heading and nothing else.
export default function HomePage() {
  return (
    <div className="list-page">
      <h1 className="visually-hidden">Pocket Chief</h1>
      <HomeLists added={listRecentlyAdded(8)} />
    </div>
  );
}
