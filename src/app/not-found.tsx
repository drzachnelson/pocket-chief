import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return <div className="empty-state"><span className="empty-icon"><MagnifyingGlass size={24} /></span><h2>Topic not found</h2><p>It may still be a draft, or this link points to an older name.</p><Link className="button" href="/">Search the atlas</Link></div>;
}
