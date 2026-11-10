import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return <div className="empty-state"><span className="empty-icon"><MagnifyingGlass size={24} aria-hidden="true" /></span><h1>Page not found</h1><p>Check the link, or head back to search.</p><Link className="button" href="/">Search</Link></div>;
}
